// src/pages/Results.jsx
// Results screen: grade, breakdown and answer review.

import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Results.css";

const LETTERS = ["A", "B", "C", "D"];

// Letter grade from the percentage
function getGrade(percentage) {
  if (percentage >= 85) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 50) return "C";
  return "F";
}

// Shows an option as "B. Round Robin", or "Not answered"
function formatOption(options, index) {
  if (index === null || index === undefined) return "Not answered";
  return `${LETTERS[index]}. ${options[index]}`;
}

function Results() {
  const { state } = useLocation(); // data sent from Attempt Quiz
  const navigate = useNavigate();
  const result = state?.result;

  // Start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // No result (for example after a page refresh)
  if (!result) {
    return (
      <div className="card no-result-card">
        <h1>No result found</h1>
        <p>Please attempt a quiz first to see your results.</p>
        <Link to="/" className="pill-btn pill-btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Values for the page
  const { score, total, percentage, results } = result;
  const wrong = total - score;
  const correctWidth = Math.round((score / total) * 100);
  const heading = percentage >= 70 ? "Good Job!" : "Keep Practising!";
  const grade = getGrade(percentage);

  return (
    <div className="results-page">
      <section className="card results-card" aria-labelledby="results-heading">
        {/* Heading */}
        <header className="results-header">
          <h1 id="results-heading">{heading}</h1>
          {state.quizTitle && <p className="results-subtitle">{state.quizTitle}</p>}
        </header>

        {/* Grade and Breakdown cards */}
        <div className="results-summary">
          <div className="summary-box">
            <h2 className="box-title">Grade</h2>
            <p className="grade-percent">{percentage}%</p>
            <div className="grade-row">
              <span className="grade-letter" aria-label={`Grade ${grade}`}>{grade}</span>
              <p className="grade-count">{score} out of {total} correct</p>
            </div>
          </div>

          <div className="summary-box">
            <h2 className="box-title">Breakdown</h2>
            {/* Green and red bar */}
            <div
              className="breakdown-bar"
              role="img"
              aria-label={`${score} correct and ${wrong} wrong`}
            >
              <div className="bar-correct" style={{ width: `${correctWidth}%` }}></div>
              <div className="bar-wrong" style={{ width: `${100 - correctWidth}%` }}></div>
            </div>

            <ul className="breakdown-list">
              <li>
                <span className="dot dot-correct" aria-hidden="true"></span>
                Correct <strong>{score}</strong>
              </li>
              <li>
                <span className="dot dot-wrong" aria-hidden="true"></span>
                Wrong <strong>{wrong}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Review of each answer */}
        <section className="review-section" aria-labelledby="review-heading">
          <h2 id="review-heading">Review your answers</h2>

          <ol className="review-list">
            {results.map((item, index) => (
              <li
                key={item.questionId}
                className={`review-item ${item.isCorrect ? "is-correct" : "is-wrong"}`}
              >
                <div className="review-top">
                  <span className="review-number">Question {index + 1}</span>
                  {/* Text label + symbol, so it does not rely on colour only */}
                  <span className="status-label">
                    <span aria-hidden="true">{item.isCorrect ? "✓" : "✗"}</span>
                    {item.isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>

                <p className="review-question">{item.text}</p>

                <dl className="review-answers">
                  <div>
                    <dt>Your answer:</dt>
                    <dd>{formatOption(item.options, item.selectedIndex)}</dd>
                  </div>
                  <div>
                    <dt>Correct answer:</dt>
                    <dd>{formatOption(item.options, item.correctIndex)}</dd>
                  </div>
                </dl>

                <p className="review-explanation">
                  <strong>Explanation:</strong> {item.explanation}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Buttons */}
        <div className="results-actions">
          {state.quizId && (
            <button
              type="button"
              className="pill-btn pill-btn-primary"
              onClick={() => navigate(`/quiz/${state.quizId}`)}
            >
              Try Again
            </button>
          )}
          <Link to="/" className="pill-btn pill-btn-outline">Back to Home</Link>
        </div>
      </section>
    </div>
  );
}

export default Results;
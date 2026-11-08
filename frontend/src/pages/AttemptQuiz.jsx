// src/pages/AttemptQuiz.jsx
// Attempt Quiz screen: summary bar, question card and question navigator.

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getQuizById, submitAttempt } from "../api/quizApi.js";
import QuestionCard from "../components/QuestionCard.jsx";
import "./AttemptQuiz.css";

function AttemptQuiz() {
  const { id } = useParams(); // quiz id from the URL (/quiz/:id)
  const navigate = useNavigate();

  // Quiz data and page state
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Attempt state
  const [currentIndex, setCurrentIndex] = useState(0); // question on screen
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Load the quiz when the page opens (or the id changes)
  useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);
    setLoading(true);
    setLoadError("");
    setAnswers({});
    setCurrentIndex(0);

    getQuizById(id)
      .then((data) => {
        if (!ignore) setQuiz(data);
      })
      .catch((err) => {
        if (!ignore) setLoadError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="card state-card" role="status">
        <div className="spinner" aria-hidden="true"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  // Error loading the quiz
  if (loadError) {
    return (
      <div className="card state-card">
        <p className="alert-error" role="alert">{loadError}</p>
        <Link to="/" className="pill-btn pill-btn-outline">Back to Home</Link>
      </div>
    );
  }

  // Values worked out from the state
  const questions = quiz.questions;
  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;
  const percent = Math.round((answeredCount / total) * 100);

  // Save the selected option for a question
  function handleSelect(questionId, index) {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    setSubmitError("");
  }

  // Submit the quiz
  async function handleSubmit() {
    // Do not submit if some questions are not answered
    const unanswered = total - answeredCount;
    if (unanswered > 0) {
      setSubmitError(
        `${unanswered} ${unanswered === 1 ? "question is" : "questions are"} not answered yet. Please answer all questions before submitting.`
      );
      // Open the first unanswered question
      setCurrentIndex(questions.findIndex((q) => answers[q.id] === undefined));
      return;
    }

    // Answers list: [{ questionId, selectedIndex }, ...]
    const answerList = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: answers[q.id],
    }));

    try {
      setSubmitting(true);
      setSubmitError("");
      const result = await submitAttempt(id, answerList);
      // Open Results and pass the data through navigation state
      navigate("/results", {
        state: { result, quizId: quiz.id, quizTitle: quiz.title },
      });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="attempt-page">
      {/* Summary bar */}
      <section className="card summary-card" aria-label="Quiz summary">
        <div className="summary-info">
          <h1 className="summary-title">{quiz.title}</h1>
          <div className="summary-pills">
            <span className="pill">{quiz.topic}</span>
            <span className={`pill pill-${quiz.difficulty.toLowerCase()}`}>
              {quiz.difficulty}
            </span>
          </div>
        </div>

        <div className="summary-progress">
          <div className="progress-text">
            <span>Completed {answeredCount} of {total}</span>
            <span>{percent}%</span>
          </div>
          {/* Progress bar with screen reader values */}
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={answeredCount}
            aria-valuetext={`${answeredCount} of ${total} questions answered`}
          >
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        <button
          type="button"
          className="pill-btn pill-btn-primary summary-submit"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </section>

      {/* Submit error message */}
      {submitError && (
        <p className="alert-error" role="alert">{submitError}</p>
      )}

      {/* Two columns: question (left) and navigator (right) */}
      <div className="attempt-layout">
        <div className="question-column">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={total}
            selectedIndex={answers[currentQuestion.id]}
            onSelect={(index) => handleSelect(currentQuestion.id, index)}
            disabled={submitting}
          />

          {/* Previous and Next buttons */}
          <div className="question-nav">
            <button
              type="button"
              className="pill-btn pill-btn-outline"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0 || submitting}
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <button
              type="button"
              className="pill-btn pill-btn-primary"
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={currentIndex === total - 1 || submitting}
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Question navigator */}
        <aside className="card navigator" aria-labelledby="navigator-heading">
          <h2 id="navigator-heading" className="navigator-title">Questions</h2>

          <div className="navigator-grid">
            {questions.map((q, index) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = index === currentIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  className={`nav-btn ${isAnswered ? "is-answered" : ""} ${isCurrent ? "is-current" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  disabled={submitting}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Question ${index + 1}, ${isAnswered ? "answered" : "not answered"}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Colour legend */}
          <ul className="navigator-legend">
            <li><span className="legend-box legend-current" aria-hidden="true"></span>Current</li>
            <li><span className="legend-box legend-answered" aria-hidden="true"></span>Answered</li>
            <li><span className="legend-box legend-unanswered" aria-hidden="true"></span>Not answered</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default AttemptQuiz;
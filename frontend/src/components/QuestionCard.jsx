// src/components/QuestionCard.jsx
// Shows one question with 4 options as a real radio group.

import "./QuestionCard.css";

const LETTERS = ["A", "B", "C", "D"];

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  onSelect,
  disabled,
}) {
  return (
    <div className="card question-card">
      {/* fieldset + legend group the options for screen readers */}
      <fieldset className="question-fieldset" disabled={disabled}>
        <legend className="question-legend">
          <span className="question-pill">
            Question {questionNumber}
            <span className="sr-only"> of {totalQuestions}</span>
          </span>
          <span className="question-text">{question.text}</span>
        </legend>

        <div className="options-list">
          {question.options.map((option, index) => {
            const inputId = `q${question.id}-option${index}`;
            const isSelected = selectedIndex === index;

            return (
              <div key={inputId} className="option-item">
                {/* Real radio input (hidden visually, still works with keyboard) */}
                <input
                  type="radio"
                  id={inputId}
                  name={`question-${question.id}`}
                  value={index}
                  checked={isSelected}
                  onChange={() => onSelect(index)}
                  className="option-input"
                />

                {/* The label is the visible option card */}
                <label htmlFor={inputId} className="option-label">
                  <span className="option-letter" aria-hidden="true">
                    {LETTERS[index]}
                  </span>
                  <span className="option-text">{option}</span>
                  {isSelected && (
                    <span className="option-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export default QuestionCard;
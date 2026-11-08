// src/components/QuizForm.jsx
// Accessible, responsive form to generate a quiz from a topic or a lecture PDF.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizApi.js";
import "./QuizForm.css";

// Largest PDF allowed: 5 MB (in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function QuizForm() {
  // Which input the student is using: "topic" or "pdf"
  const [mode, setMode] = useState("topic");

  // Form values
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);
  const [difficulty, setDifficulty] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState(5);

  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Switch between Enter Topic and Upload PDF
  function handleModeChange(newMode) {
    setMode(newMode);
    setError("");
  }

  // Update the topic and clear any old error
  function handleTopicChange(e) {
    setTopic(e.target.value);
    setError("");
  }

  // Check the selected file (PDF only, max 5 MB)
  function handleFileChange(e) {
    const selected = e.target.files[0];
    setError("");
    if (!selected) return;

    const isPdf =
      selected.type === "application/pdf" ||
      selected.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please upload a PDF file only.");
      e.target.value = ""; // clear the wrong file
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("This PDF is larger than 5 MB. Please choose a smaller file.");
      e.target.value = "";
      return;
    }
    setFile(selected);
  }

  // Remove the selected file
  function handleRemoveFile() {
    setFile(null);
    setError("");
  }

  // Runs when Generate Quiz is pressed
  async function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    // Validate the active option
    if (mode === "topic" && topic.trim().length < 3) {
      setError("Please enter a topic with at least 3 characters.");
      return;
    }
    if (mode === "pdf" && !file) {
      setError("Please upload a lecture PDF.");
      return;
    }

    // Build FormData: send the topic OR the file, never both
    const formData = new FormData();
    if (mode === "topic") {
      formData.append("topic", topic.trim());
    } else {
      formData.append("file", file); // backend expects the field name "file"
    }
    formData.append("difficulty", difficulty);
    formData.append("numQuestions", numQuestions);

    try {
      setLoading(true);
      setError("");
      const quiz = await createQuiz(formData);
      navigate(`/quiz/${quiz.id}`); // open the new quiz
    } catch (err) {
      setError(err.message); // error message from quizApi
    } finally {
      setLoading(false);
    }
  }

  // Link inputs to the error message for screen readers
  const errorId = error ? "form-error" : undefined;

  return (
    <form className="quiz-form" onSubmit={handleSubmit} noValidate>
      {/* Disabling the fieldset disables every control inside it */}
      <fieldset disabled={loading} className="quiz-fieldset">
        <legend className="quiz-title">Generate a Quiz</legend>

        {/* Toggle: aria-pressed tells screen readers which option is selected */}
        <div className="mode-toggle" role="group" aria-label="Choose quiz source">
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={mode === "topic"}
            onClick={() => handleModeChange("topic")}
          >
            Enter Topic
          </button>
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={mode === "pdf"}
            onClick={() => handleModeChange("pdf")}
          >
            Upload PDF
          </button>
        </div>

        {/* Topic input (shown in topic mode) */}
        {mode === "topic" && (
          <div className="form-field">
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              placeholder="e.g. Operating Systems"
              value={topic}
              onChange={handleTopicChange}
              aria-invalid={Boolean(error)}
              aria-describedby={`topic-hint ${errorId || ""}`.trim()}
            />
            <p id="topic-hint" className="hint">At least 3 characters.</p>
          </div>
        )}

        {/* PDF upload (shown in PDF mode) */}
        {mode === "pdf" && (
          <div className="form-field">
            <label htmlFor="file">Lecture PDF</label>

            {/* Show the file input, or the selected file with a Remove button */}
            {!file ? (
              <input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                aria-invalid={Boolean(error)}
                aria-describedby={`file-hint ${errorId || ""}`.trim()}
              />
            ) : (
              <div className="file-selected" id="file">
                <span className="file-name">{file.name}</span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={handleRemoveFile}
                  aria-label={`Remove file ${file.name}`}
                >
                  Remove
                </button>
              </div>
            )}
            <p id="file-hint" className="hint">PDF only, maximum 5 MB.</p>
          </div>
        )}

        {/* Difficulty and number of questions */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="numQuestions">Number of Questions</label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>

        {/* Error message: role="alert" makes screen readers announce it */}
        {error && (
          <p id="form-error" className="error-text" role="alert">
            {error}
          </p>
        )}

        {/* Submit button */}
        <button type="submit" className="submit-btn">
          {loading ? "Generating..." : "Generate Quiz"}
        </button>

        {/* Announces loading to screen readers (hidden on screen) */}
        <p className="sr-only" role="status">
          {loading ? "Generating quiz, please wait." : ""}
        </p>
      </fieldset>
    </form>
  );
}

export default QuizForm;
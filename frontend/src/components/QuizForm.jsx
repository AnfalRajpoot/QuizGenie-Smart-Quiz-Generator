// src/components/QuizForm.jsx
// Form to generate a quiz from a topic or a lecture PDF.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizApi.js";
import "./QuizForm.css";

function QuizForm() {
  // Form values
  const [source, setSource] = useState("topic"); // "topic" or "pdf"
  const [topic, setTopic] = useState("");
  const [pdf, setPdf] = useState(null);
  const [difficulty, setDifficulty] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState(5);

  // Loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Save the chosen file (only PDF files are allowed)
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      setPdf(null);
      return;
    }
    setError("");
    setPdf(file);
  }

  // Runs when the Generate button is pressed
  async function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    // Check that the user gave a topic or a PDF
    if (source === "topic" && topic.trim() === "") {
      setError("Please enter a topic");
      return;
    }
    if (source === "pdf" && !pdf) {
      setError("Please upload a PDF file");
      return;
    }

    // Put the form values into FormData (needed for file upload)
    const formData = new FormData();
    if (source === "topic") formData.append("topic", topic.trim());
    else formData.append("pdf", pdf);
    formData.append("difficulty", difficulty);
    formData.append("numQuestions", numQuestions);

    setLoading(true);
    setError("");
    try {
      const quiz = await createQuiz(formData);
      navigate(`/quiz/${quiz.id}`); // open the new quiz
    } catch (err) {
      setError(err.message); // show the error from quizApi
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <h2>Generate a Quiz</h2>

      {/* Choose between topic and PDF */}
      <div className="source-tabs">
        <button
          type="button"
          className={source === "topic" ? "active" : ""}
          onClick={() => { setSource("topic"); setError(""); }}
        >
          Enter Topic
        </button>
        <button
          type="button"
          className={source === "pdf" ? "active" : ""}
          onClick={() => { setSource("pdf"); setError(""); }}
        >
          Upload PDF
        </button>
      </div>

      {/* Show the topic box or the file picker */}
      {source === "topic" ? (
        <label>
          Topic
          <input
            type="text"
            placeholder="e.g. Operating Systems"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
      ) : (
        <label>
          Lecture PDF
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </label>
      )}

      {/* Difficulty level */}
      <label>
        Difficulty
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      {/* Number of questions */}
      <label>
        Number of Questions
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </label>

      {/* Error message */}
      {error && <p className="form-error">{error}</p>}

      {/* Button is disabled while the quiz is being generated */}
      <button type="submit" className="generate-btn" disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </form>
  );
}

export default QuizForm;
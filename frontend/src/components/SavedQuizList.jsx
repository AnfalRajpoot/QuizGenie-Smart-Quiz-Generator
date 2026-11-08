// src/components/SavedQuizList.jsx
// Shows saved quizzes (Read) with Rename (Update) and Delete options.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes, renameQuiz, deleteQuiz } from "../api/quizApi.js";
import "./SavedQuizList.css";

// Turns "2026-11-01T10:30:00Z" into a readable date like "1 Nov 2026"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SavedQuizList() {
  // List data and page state
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // error loading the list

  // Rename state
  const [editingId, setEditingId] = useState(null); // card being renamed
  const [editTitle, setEditTitle] = useState("");

  // Delete state
  const [confirmId, setConfirmId] = useState(null); // card asking "are you sure?"

  // Card action state
  const [busyId, setBusyId] = useState(null); // card being saved or deleted
  const [cardError, setCardError] = useState(""); // error shown inside a card

  const navigate = useNavigate();

  // READ: load quizzes when the page opens
  useEffect(() => {
    let ignore = false; // avoids updating state after leaving the page

    getQuizzes()
      .then((data) => {
        if (!ignore) setQuizzes(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Open the rename input inside a card
  function startRename(quiz) {
    setEditingId(quiz.id);
    setEditTitle(quiz.title);
    setConfirmId(null);
    setCardError("");
  }

  // Close the rename input without saving
  function cancelRename() {
    setEditingId(null);
    setEditTitle("");
    setCardError("");
  }

  // UPDATE: save the new title
  async function saveRename(e, id) {
    e.preventDefault(); // stop the page from reloading
    const newTitle = editTitle.trim();

    if (!newTitle) {
      setCardError("Title cannot be empty.");
      return;
    }

    try {
      setBusyId(id);
      setCardError("");
      await renameQuiz(id, newTitle);
      // Update the title in the list on screen
      setQuizzes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, title: newTitle } : q))
      );
      setEditingId(null);
    } catch (err) {
      setCardError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  // Ask the student to confirm before deleting
  function askDelete(id) {
    setConfirmId(id);
    setEditingId(null);
    setCardError("");
  }

  // Close the delete confirmation
  function cancelDelete() {
    setConfirmId(null);
    setCardError("");
  }

  // DELETE: remove the quiz after confirmation
  async function confirmDelete(id) {
    try {
      setBusyId(id);
      setCardError("");
      await deleteQuiz(id);
      // Remove the quiz from the list on screen
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      setConfirmId(null);
    } catch (err) {
      setCardError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="saved-quizzes" aria-labelledby="saved-heading">
      <h2 id="saved-heading" className="saved-title">
        Saved Quizzes
      </h2>

      {/* Loading message */}
      {loading && (
        <p className="status-text" role="status">
          Loading quizzes...
        </p>
      )}

      {/* Error loading the list */}
      {error && (
        <p className="list-error" role="alert">
          {error}
        </p>
      )}

      {/* Empty list message */}
      {!loading && !error && quizzes.length === 0 && (
        <p className="status-text">
          You don't have any saved quizzes yet. Generate your first quiz above!
        </p>
      )}

      {/* List of quiz cards */}
      {quizzes.length > 0 && (
        <ul className="quiz-list">
          {quizzes.map((quiz) => {
            const busy = busyId === quiz.id;
            const editing = editingId === quiz.id;
            const confirming = confirmId === quiz.id;
            const errorId = `card-error-${quiz.id}`;

            return (
              <li key={quiz.id} className="quiz-card" aria-busy={busy}>
                {/* Title, or the rename form */}
                {editing ? (
                  <form
                    className="rename-form"
                    onSubmit={(e) => saveRename(e, quiz.id)}
                  >
                    <label htmlFor={`rename-${quiz.id}`} className="rename-label">
                      New title
                    </label>
                    <input
                      id={`rename-${quiz.id}`}
                      type="text"
                      value={editTitle}
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                        setCardError("");
                      }}
                      // Escape key cancels renaming
                      onKeyDown={(e) => e.key === "Escape" && cancelRename()}
                      disabled={busy}
                      autoFocus
                      aria-invalid={Boolean(cardError)}
                      aria-describedby={cardError ? errorId : undefined}
                    />

                    {cardError && (
                      <p id={errorId} className="card-error" role="alert">
                        {cardError}
                      </p>
                    )}

                    <div className="card-actions">
                      <button type="submit" className="btn btn-primary" disabled={busy}>
                        {busy ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={cancelRename}
                        disabled={busy}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <h3 className="quiz-card-title">{quiz.title}</h3>
                )}

                {/* Quiz details */}
                <ul className="quiz-details">
                  <li>
                    <span className="detail-label">Topic:</span> {quiz.topic}
                  </li>
                  <li>
                    <span className="detail-label">Difficulty:</span>{" "}
                    <span className={`badge badge-${quiz.difficulty.toLowerCase()}`}>
                      {quiz.difficulty}
                    </span>
                  </li>
                  <li>
                    <span className="detail-label">Questions:</span> {quiz.numQuestions}
                  </li>
                  <li>
                    <span className="detail-label">Created:</span>{" "}
                    <time dateTime={quiz.createdAt}>{formatDate(quiz.createdAt)}</time>
                  </li>
                </ul>

                {/* Delete confirmation */}
                {confirming && (
                  <div className="confirm-box">
                    <p className="confirm-text">
                      Delete this quiz? This cannot be undone.
                    </p>

                    {cardError && (
                      <p className="card-error" role="alert">
                        {cardError}
                      </p>
                    )}

                    <div className="card-actions">
                      <button
                        type="button"
                        className="btn btn-danger-solid"
                        onClick={() => confirmDelete(quiz.id)}
                        disabled={busy}
                        aria-label={`Yes, delete quiz ${quiz.title}`}
                      >
                        {busy ? "Deleting..." : "Yes, Delete"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={cancelDelete}
                        disabled={busy}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Normal buttons (hidden while renaming or confirming) */}
                {!editing && !confirming && (
                  <div className="card-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      disabled={busy}
                      aria-label={`Start quiz ${quiz.title}`}
                    >
                      Start
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => startRename(quiz)}
                      disabled={busy}
                      aria-label={`Rename quiz ${quiz.title}`}
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => askDelete(quiz.id)}
                      disabled={busy}
                      aria-label={`Delete quiz ${quiz.title}`}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default SavedQuizList;
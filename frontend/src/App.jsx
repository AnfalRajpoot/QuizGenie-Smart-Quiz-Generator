// src/App.jsx
// Main layout: a header at the top and the routes for each screen.

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AttemptQuiz from "./pages/AttemptQuiz.jsx";
import Results from "./pages/Results.jsx";
import "./App.css";

function App() {
  return (
    <>
      {/* Header: clicking the app name goes back to Home */}
      <header className="app-header">
        <Link to="/" className="app-logo">
          QuizGenie
        </Link>
      </header>

      {/* Only the page that matches the URL is shown here */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* :id is the quiz id, for example /quiz/1 */}
          <Route path="/quiz/:id" element={<AttemptQuiz />} />
          {/* Results gets its data from the navigation state */}
          <Route path="/results" element={<Results />} />
          {/* Any other path shows this message */}
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
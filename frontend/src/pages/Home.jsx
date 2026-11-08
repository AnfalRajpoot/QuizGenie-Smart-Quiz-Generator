// src/pages/Home.jsx
// Home page: quiz form (Create) and saved quizzes (Read, Update, Delete).

import QuizForm from "../components/QuizForm.jsx";
import SavedQuizList from "../components/SavedQuizList.jsx";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <QuizForm />
      <SavedQuizList />
    </div>
  );
}

export default Home;
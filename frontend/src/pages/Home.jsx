// src/pages/Home.jsx
// Home page: quiz form (Create) at the top, saved quizzes (Read, Update, Delete) below.

import QuizForm from "../components/QuizForm.jsx";
import SavedQuizList from "../components/SavedQuizList.jsx";

function Home() {
  return (
    <div className="home-page">
      <QuizForm />
      <SavedQuizList />
    </div>
  );
}

export default Home;
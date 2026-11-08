// src/mock/mockQuiz.js
// Sample data to build and test the frontend before the backend is ready.
// The field names match the data our backend will return.

// 1. mockQuizList: saved quizzes shown on the Home screen
export const mockQuizList = [
  {
    id: 1,
    title: "Operating Systems Basics",
    topic: "Operating Systems",
    difficulty: "Medium",
    numQuestions: 5,
    createdAt: "2026-11-01T10:30:00Z",
  },
  {
    id: 2,
    title: "Introduction to Probability",
    topic: "Probability and Statistics",
    difficulty: "Easy",
    numQuestions: 10,
    createdAt: "2026-11-03T14:15:00Z",
  },
  {
    id: 3,
    title: "Finite Automata",
    topic: "Theory of Automata",
    difficulty: "Hard",
    numQuestions: 15,
    createdAt: "2026-11-05T09:00:00Z",
  },
];

// 2. mockQuiz: one full quiz shown on the Attempt Quiz screen
// The correct answers are NOT included, so the student can't see them.
export const mockQuiz = {
  id: 1,
  title: "Operating Systems Basics",
  topic: "Operating Systems",
  difficulty: "Medium",
  numQuestions: 5,
  createdAt: "2026-11-01T10:30:00Z",
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a function of an operating system?",
      options: [
        "Memory management",
        "Process management",
        "Compiling source code",
        "File management",
      ],
    },
    {
      id: 2,
      text: "Which CPU scheduling algorithm can cause starvation of long processes?",
      options: [
        "First-Come, First-Served",
        "Round Robin",
        "Shortest Job First",
        "None of the above",
      ],
    },
    {
      id: 3,
      text: "What is a deadlock?",
      options: [
        "A process that has finished running",
        "A situation where processes wait for each other forever",
        "A process using too much memory",
        "A crash of the operating system",
      ],
    },
    {
      id: 4,
      text: "Which memory management technique divides memory into fixed-size blocks?",
      options: ["Paging", "Segmentation", "Swapping", "Fragmentation"],
    },
    {
      id: 5,
      text: "What is the main purpose of a semaphore?",
      options: [
        "To schedule processes on the CPU",
        "To control access to shared resources",
        "To allocate memory to processes",
        "To store files on disk",
      ],
    },
  ],
};

// 3. mockAttemptResult: result shown on the Results screen
// The student got 4 out of 5 correct (question 2 is wrong).
// selectedIndex and correctIndex are option positions starting from 0.
export const mockAttemptResult = {
  attemptId: 101,
  score: 4,
  total: 5,
  percentage: 80,
  results: [
    {
      questionId: 1,
      text: "Which of the following is NOT a function of an operating system?",
      options: [
        "Memory management",
        "Process management",
        "Compiling source code",
        "File management",
      ],
      selectedIndex: 2,
      correctIndex: 2,
      isCorrect: true,
      explanation:
        "Compiling source code is done by a compiler, not by the operating system.",
    },
    {
      questionId: 2,
      text: "Which CPU scheduling algorithm can cause starvation of long processes?",
      options: [
        "First-Come, First-Served",
        "Round Robin",
        "Shortest Job First",
        "None of the above",
      ],
      selectedIndex: 1,
      correctIndex: 2,
      isCorrect: false,
      explanation:
        "Shortest Job First always picks short jobs, so long jobs may wait forever. Round Robin gives every process a turn, so it avoids starvation.",
    },
    {
      questionId: 3,
      text: "What is a deadlock?",
      options: [
        "A process that has finished running",
        "A situation where processes wait for each other forever",
        "A process using too much memory",
        "A crash of the operating system",
      ],
      selectedIndex: 1,
      correctIndex: 1,
      isCorrect: true,
      explanation:
        "A deadlock happens when each process holds a resource and waits for a resource held by another, so none of them can continue.",
    },
    {
      questionId: 4,
      text: "Which memory management technique divides memory into fixed-size blocks?",
      options: ["Paging", "Segmentation", "Swapping", "Fragmentation"],
      selectedIndex: 0,
      correctIndex: 0,
      isCorrect: true,
      explanation:
        "Paging divides memory into fixed-size blocks called pages and frames. Segmentation uses blocks of different sizes.",
    },
    {
      questionId: 5,
      text: "What is the main purpose of a semaphore?",
      options: [
        "To schedule processes on the CPU",
        "To control access to shared resources",
        "To allocate memory to processes",
        "To store files on disk",
      ],
      selectedIndex: 1,
      correctIndex: 1,
      isCorrect: true,
      explanation:
        "A semaphore is a synchronization tool that controls how processes access shared resources.",
    },
  ],
};
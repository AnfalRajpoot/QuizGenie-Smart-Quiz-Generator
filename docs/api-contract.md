# QuizGenie API Contract

All responses are JSON. Errors return `{ "error": "message" }` with a proper status code.
Correct answers are NOT sent with the quiz. They are only returned after an attempt is submitted.

## POST /api/quizzes – Create a quiz
Request (multipart/form-data): `topic` (text) OR `file` (PDF), `difficulty` (Easy | Medium | Hard), `numQuestions` (5 | 10 | 15)

Response:
```json
{
  "id": 1,
  "title": "Operating Systems",
  "topic": "Operating Systems",
  "difficulty": "Easy",
  "numQuestions": 5,
  "createdAt": "2026-11-08T10:00:00Z",
  "questions": [
    { "id": 11, "text": "What is the main function of an OS?", "options": ["Manage resources", "Create websites", "Edit pictures", "Design games"] }
  ]
}
```

## GET /api/quizzes – List saved quizzes
```json
[ { "id": 1, "title": "Operating Systems", "topic": "Operating Systems", "difficulty": "Easy", "numQuestions": 5, "createdAt": "2026-11-08T10:00:00Z" } ]
```

## GET /api/quizzes/:id – Get one quiz
Same response as POST /api/quizzes.

## PUT /api/quizzes/:id – Rename a quiz
Request: `{ "title": "OS Midterm Practice" }`
Response: the updated quiz.

## DELETE /api/quizzes/:id – Delete a quiz
Response: `{ "message": "Quiz deleted" }`

## POST /api/quizzes/:id/attempts – Submit answers
Request:
```json
{ "answers": [ { "questionId": 11, "selectedIndex": 0 } ] }
```
Response:
```json
{
  "attemptId": 7,
  "score": 4,
  "total": 5,
  "percentage": 80,
  "results": [
    { "questionId": 11, "text": "What is the main function of an OS?", "options": ["Manage resources", "Create websites", "Edit pictures", "Design games"], "selectedIndex": 0, "correctIndex": 0, "isCorrect": true, "explanation": "An OS manages hardware and software resources." }
  ]
}
```
# Prompt Log – QuizGenie (Frontend)

| # | Prompt (short) | What AI gave | What was wrong | How we fixed it | Member |
|---|---|---|---|---|---|
| 1 | Generate a README for QuizGenie (description, features, tech stack, API endpoints, setup, usage, team, GitHub collaboration) | Full README in Markdown | Some fields were placeholders (clone URL, team names, database name, start command) | Added my own name; other placeholders will be filled before final submission | Mahnoor |
| 2 | Create src/mock/mockQuiz.js with mockQuizList, mockQuiz (without correct answers) and mockAttemptResult (4/5 correct), using exact field names | Mock data file with 3 named exports | Nothing wrong. Checked field names against our API contract and checked answers manually | No fix needed | Mahnoor |
| 3 | How to test the mock data file from the terminal without creating a new file | Node commands that check exports, field values, hidden answers and score | Nothing wrong. All 8 checks returned true | No fix needed | Mahnoor |
| 4 | Routing for 3 screens using react-router-dom 7.18.5 | main.jsx (router setup), App.jsx (routes + header), 3 placeholder pages | Nothing wrong. Used the correct v7 syntax (Routes + element, not old Switch) | No fix needed. Tested /, /quiz/1, /results, /abc in browser | Mahnoor |

## Vague vs Detailed Prompt (UI component: QuizForm)
- Vague prompt:
- Detailed prompt:
- Differences (accessibility, responsiveness, state):
- Screenshots: docs/screenshots/
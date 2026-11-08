# Prompt Log – QuizGenie (Frontend)

| # | Prompt (short) | What AI gave | What was wrong | How we fixed it | Member |
|---|---|---|---|---|---|
| 1 | Generate a README for QuizGenie (description, features, tech stack, API endpoints, setup, usage, team, GitHub collaboration) | Full README in Markdown | Some fields were placeholders (clone URL, team names, database name, start command) | Added my own name; other placeholders will be filled before final submission | Mahnoor |
| 2 | Create src/mock/mockQuiz.js with mockQuizList, mockQuiz (without correct answers) and mockAttemptResult (4/5 correct), using exact field names | Mock data file with 3 named exports | Nothing wrong. Checked field names against our API contract and checked answers manually | No fix needed | Mahnoor |
| 3 | How to test the mock data file from the terminal without creating a new file | Node commands that check exports, field values, hidden answers and score | Nothing wrong. All 8 checks returned true | No fix needed | Mahnoor |
| 4 | Routing for 3 screens using react-router-dom 7.18.5 | main.jsx (router setup), App.jsx (routes + header), 3 placeholder pages | Nothing wrong. Used the correct v7 syntax (Routes + element, not old Switch) | No fix needed. Tested /, /quiz/1, /results, /abc in browser | Mahnoor |
| 5 | Data service file quizApi.js with CRUD functions, mock on/off switch, loading delay and error handling | quizApi.js with 6 functions using mock data or axios | 2 mismatches with our API contract: errors were read from "message" instead of "error", and the PDF field was named "pdf" instead of "file" | Fixed by hand: changed to data?.error and formData.get("file") | Mahnoor |
| 6 | How to test all quizApi.js functions from the terminal without creating a file | Node command testing all CRUD functions, submit, empty form error and wrong id error | AI said to run it from the main project folder, but the src folder is inside frontend, so it must be run from the frontend folder | Ran it from the frontend folder; all 8 checks passed (screenshot: quizapi-test.png) | Mahnoor |
| 7 | Vague prompt: "Create a quiz generator form in React. The user should be able to type a topic or upload a PDF, pick a difficulty level and how many questions they want, then press a button to generate the quiz." | QuizForm.jsx, QuizForm.css and Home page update | Sent PDF as "pdf" instead of "file" (mismatch with API contract); no file size limit; error not announced to screen readers; Topic/PDF tabs don't tell screen readers which one is selected; no keyboard focus style; no mobile adjustments; labels centered and low contrast on dark background. Kept as the vague version for comparison; will fix with a detailed prompt | Mahnoor |

## Vague vs Detailed Prompt (UI component: QuizForm)
- Vague prompt:"Create a quiz generator form in React. The user should be able to type a topic or upload a PDF, pick a difficulty level and how many questions they want, then press a button to generate the quiz."
- Detailed prompt:
- Differences (accessibility, responsiveness, state):
- Screenshots: "C:\Users\hp\Pictures\Screenshots\vague.png"
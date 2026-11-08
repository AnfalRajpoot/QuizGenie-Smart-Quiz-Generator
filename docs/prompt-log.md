# Prompt Log – QuizGenie (Frontend)

| # | Prompt (short) | What AI gave | What was wrong | How we fixed it | Member |
|---|---|---|---|---|---|
| 1 | Generate a README for QuizGenie (description, features, tech stack, API endpoints, setup, usage, team, GitHub collaboration) | Full README in Markdown | Some fields were placeholders (clone URL, team names, database name, start command) | Added my own name; other placeholders will be filled before final submission | Mahnoor |
| 2 | Create src/mock/mockQuiz.js with mockQuizList, mockQuiz (without correct answers) and mockAttemptResult (4/5 correct), using exact field names | Mock data file with 3 named exports | Nothing wrong. Checked field names against our API contract and checked answers manually | No fix needed | Mahnoor |
| 3 | How to test the mock data file from the terminal without creating a new file | Node commands that check exports, field values, hidden answers and score | Nothing wrong. All 8 checks returned true | No fix needed | Mahnoor |
| 4 | Routing for 3 screens using react-router-dom 7.18.5 | main.jsx (router setup), App.jsx (routes + header), 3 placeholder pages | Nothing wrong. Used the correct v7 syntax (Routes + element, not old Switch) | No fix needed. Tested /, /quiz/1, /results, /abc in browser | Mahnoor |
| 5 | Data service file quizApi.js with CRUD functions, mock on/off switch, loading delay and error handling | quizApi.js with 6 functions using mock data or axios | 2 mismatches with our API contract: errors were read from "message" instead of "error", and the PDF field was named "pdf" instead of "file" | Fixed by hand: changed to data?.error and formData.get("file") | Mahnoor |
| 6 | How to test all quizApi.js functions from the terminal without creating a file | Node command testing all CRUD functions, submit, empty form error and wrong id error | AI said to run it from the main project folder, but the src folder is inside frontend, so it must be run from the frontend folder | Ran it from the frontend folder; all 8 checks passed (screenshot: quizapi-test.png) | Mahnoor |
| 7 | Vague prompt: "Create a quiz generator form in React. The user should be able to type a topic or upload a PDF, pick a difficulty level and how many questions they want, then press a button to generate the quiz." | QuizForm.jsx, QuizForm.css and Home page update | Sent PDF as "pdf" instead of "file" (mismatch with API contract); no file size limit; error not announced to screen readers; Topic/PDF tabs don't tell screen readers which one is selected; no keyboard focus style; no mobile adjustments; labels centered and low contrast on dark background | Kept as the vague version for comparison; fixed with a detailed prompt | Mahnoor |
| 8 | Detailed prompt: rebuild the same QuizForm with clear requirements for data, validation, accessibility, responsiveness and state | New QuizForm.jsx and QuizForm.css meeting all the requirements | AI also told me to change formData.get("pdf") to "file" in quizApi.js, but this was already fixed earlier, so the instruction was outdated | Did not apply the outdated change; used the new QuizForm and CSS and tested them on desktop and mobile | Mahnoor |
| 9 | Home page: saved quiz list (SavedQuizList.jsx + CSS) below the QuizForm with Start, Rename and Delete, plus loading, empty and error states | SavedQuizList.jsx, SavedQuizList.css and updated Home.jsx | Nothing wrong. AI chose an in-card delete confirmation instead of a browser pop-up, which works better with keyboard and screen readers. With mock data, renamed and deleted quizzes come back after a page refresh (expected until the real backend is connected) | No fix needed. Tested list loading, empty title error, rename, delete with confirmation and cancel, empty list message, Start button and mobile layout | Mahnoor | (screenshots: home-mobile.png, home-delete-confirm.png)



## Vague vs Detailed Prompt (UI component: QuizForm)

- **Vague prompt:** "Create a quiz generator form in React. The user should be able to type a topic or upload a PDF, pick a difficulty level and how many questions they want, then press a button to generate the quiz."

- **Detailed prompt:** Asked to rebuild the same form with clear requirements: send the PDF as "file"; topic of at least 3 characters; PDF only and max 5 MB; show the selected file name with a Remove button; labels linked with htmlFor/id; aria-pressed on the Enter Topic / Upload PDF toggle; role="alert" for errors; keyboard support with :focus-visible; WCAG AA contrast on a dark background; a mobile media query with margin from the screen edges and full-width fields; left-aligned labels; "Generating..." with the whole form disabled using a fieldset; and clearing the error when the user changes the input.

- **Differences:**
  - **Data:** the vague version sent the PDF as "pdf" (did not match our API contract); the detailed version sends it as "file".
  - **Validation:** the vague version had no file size limit and accepted a 1-letter topic; the detailed version rejects PDFs over 5 MB, needs at least 3 characters and shows the file name with a Remove button.
  - **Accessibility:** in the vague version errors were not announced to screen readers, the selected tab was shown only by colour, there was no clear focus style and labels had low contrast; the detailed version uses role="alert", aria-pressed, a yellow :focus-visible outline and high-contrast left-aligned labels.
  - **Responsiveness:** on mobile the vague form touched the screen edges and had the same spacing as on a laptop; the detailed version keeps a margin from the edges, stacks all fields at full width and uses smaller padding.
  - **State:** both showed "Generating..."; the detailed version also disables the whole form while loading and clears the error as soon as the user changes the input.

- **UI problem fixed:** the form touched the screen edges on mobile and labels were hard to read; fixed with a mobile media query, left-aligned labels and better contrast.

- **Screenshots:** docs/screenshots/vague-desktop.png, docs/screenshots/vague-mobile.png, docs/screenshots/detailed-desktop.png, docs/screenshots/detailed-mobile.png
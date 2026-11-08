// src/main.jsx
// Entry point of the app: renders App inside the router.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter lets the whole app use routes and links */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
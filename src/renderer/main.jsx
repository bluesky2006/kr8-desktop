import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "../index.css"; // reuse your Tailwind file

const root = createRoot(document.getElementById("root"));
root.render(<App />);

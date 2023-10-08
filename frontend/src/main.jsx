import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { WhiteboardContextProvider } from "./context/WhiteboardContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WhiteboardContextProvider>
        <App />
      </WhiteboardContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

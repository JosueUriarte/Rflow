import React, { useState, useEffect } from "react";

import sentencesData from "./friends.json";

import "reactflow/dist/style.css";
import "./main.css";

import { AppBar, IconButton } from "@mui/material";
import { WhiteboardContextProvider } from "./context/WhiteboardContext.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import io from "socket.io-client";

import Whiteboard from "./components/Whiteboard";

import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

// TODO: make defaultViewport dynamic
// TODO: make font size dictate the min. resize of a node
// TODO: change all setNode logic to be more efficient and into one function
// TODO: props validiation for child nodes
// TODO: fix layout rendering error when resizing node (better conditionals and css)
// TODO: make two backgeounds with alternating big dot small dot
// TODO: put setNodes into one function instead of calling it multiple times
// TODO: fix node edge spawn bug with edge detection
// TODO: fix edge bug when resizing parent node and its connected to child node
// TODO: fix minimap bug

function App() {
  const { user } = useAuthContext();
  const [randomSentence, setRandomSentence] = useState("");

  // Generates a random sentence from predefined array at bottom left
  useEffect(() => {
    const sentences = sentencesData.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIndex]);
  }, []);

  // TODO: Seperate Header and Footer into own components
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="body-container">
          <Routes>
            <Route
              path="/"
              element={user ? <Whiteboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

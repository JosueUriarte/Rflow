import React, { useState, useEffect } from "react";
import sentencesData from "../friends.json";
const Footer = () => {
  const [randomSentence, setRandomSentence] = useState("");

  // Generates a random sentence from predefined array at bottom left
  useEffect(() => {
    const sentences = sentencesData.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIndex]);
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <p className="left-text">
          Created by Josue U. and Miguelcloid R. {randomSentence}
        </p>
        <p className="right-text">
          Check out the{" "}
          <a
            href="https://github.com/JosueUriarte/R-Wireframe/tree/main"
            className="github-link"
          >
            GitHub Project
          </a>
          <span className="logo-space"></span>{" "}
        </p>{" "}
      </div>
    </footer>
  );
};

export default Footer;

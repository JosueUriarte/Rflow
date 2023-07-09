import { useRef, useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./CustomNodes.css";

function TextObject({ data, isConnectable }) {
  return (
    <textarea
      defaultValue="Hello World"
      style={{
        background: "none",
        border: "none",
        resize: "none",
        width: "100%",
        height: "auto",
        overflow: "hidden",
        fontSize: "inherit",
        fontFamily: "inherit",
        color: "inherit",
        outline: "none",
      }}
    />
  );
}

export default TextObject;

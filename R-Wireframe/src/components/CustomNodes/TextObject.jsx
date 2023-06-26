import { useRef, useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./CustomNodes.css";

function TextObject({ data, isConnectable }) {
  const textareaRef = useRef(null);

  const handleOnClick = useCallback(() => {
    textareaRef.current.focus();
  }, []);

  const handleOnChange = useCallback(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  return (
    <textarea
      ref={textareaRef}
      defaultValue="test"
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
      onClick={handleOnClick}
      onChange={handleOnChange}
    />
  );
}

export default TextObject;

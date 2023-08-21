import { useRef, useCallback } from "react";
import { Handle, Position, useStore } from "reactflow";

function TextInput({ readBool, textareaStyle }) {
  const textareaRef = useRef(null);

  const handleOnDoubleClick = (e) => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  };

  const textAreaStyle = {
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
    textAlign: "center",
    cursor: readBool ? "grab" : "auto",
  };

  return (
    <textarea
      ref={textareaRef}
      readOnly={readBool}
      defaultValue="Hello World"
      style={textAreaStyle}
      onDoubleClick={handleOnDoubleClick}
    />
  );
}

export default TextInput;

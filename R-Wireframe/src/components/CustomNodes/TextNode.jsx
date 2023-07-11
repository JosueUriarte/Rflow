import React, { useState, useRef } from "react";

function TextNode(data) {
  const [readBool, setReadBool] = useState(true);
  const textareaRef = useRef(null);

  const handleOnDoubleClick = (e) => {
    setReadBool(false);
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  };

  const handleOnBlur = (e) => {
    setReadBool(true);
  };

  const textareaStyle = {
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
    cursor: readBool ? "default" : "auto",
  };

  return (
    <div
      className="text-updater-node"
      onDoubleClick={handleOnDoubleClick}
      onBlur={handleOnBlur}
    >
      <textarea
        ref={textareaRef}
        readOnly={readBool}
        defaultValue="Hello World"
        style={textareaStyle}
      />
    </div>
  );
}

export default TextNode;

import React, { useState, useRef } from "react";
import TextInput from "./UserInputFields/TextInput";
// TODO: fix double click behavior to switch behavior to double click a word
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

  return (
    <div
      className="text-updater-node"
      onDoubleClick={handleOnDoubleClick}
      onBlur={handleOnBlur}
    >
      <TextInput readBool={readBool} />
    </div>
  );
}

export default TextNode;

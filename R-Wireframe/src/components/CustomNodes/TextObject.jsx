import { useRef, useCallback } from "react";
import { Handle, Position } from "reactflow";
import ContentEditable from "react-contenteditable";
import "./CustomNodes.css";

function TextObject({ data, isConnectable }) {
  const text = useRef("test");

  const handleContentChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleOnClick = (evt) => {
    // Check detail if user double click the node
    if (evt.detail == 2 && window.getSelection) {
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(evt.target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <blockquote>
      <ContentEditable
        onChange={handleContentChange}
        onClick={handleOnClick}
        disabled={false}
        html={text.current}
      />
    </blockquote>
  );
}

export default TextObject;

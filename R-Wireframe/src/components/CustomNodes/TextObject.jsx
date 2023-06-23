import { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import ContentEditable from "react-contenteditable";
import "./CustomNodes.css";

function TextObject({ data, isConnectable }) {
  const [content, setContent] = useState("Sample Text Object");

  const onContentChange = useCallback((evt) => {
    setContent(evt.currentTarget.innerHTML);
  }, []);

  return (
    <blockquote>
      <ContentEditable
        onChange={onContentChange}
        onBlur={onContentChange}
        disabled={false}
        html={content}
      />
    </blockquote>
  );
}

export default TextObject;

import { useRef, useCallback } from "react";
// https://blixtdev.com/how-to-use-contenteditable-with-react/
// TODO: look into santizehtml, author says its used for xml attacks
// TODO: add dynamic logic node name (prob with data)
function TextNode({ data, isConnectable }) {
  return (
    <div className="text-updater-node">
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
    </div>
  );
}

export default TextNode;

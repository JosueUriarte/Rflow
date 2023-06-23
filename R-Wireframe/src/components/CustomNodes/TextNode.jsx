import { useState, useCallback } from "react";
import ContentEditable from "react-contenteditable";
// https://blixtdev.com/how-to-use-contenteditable-with-react/
// TODO: look into santizehtml, author says its used for xml attacks
// TODO: add dynamic logic node name (prob with data)
// TODO: Fix double click mechanic
function TextNode({ data, isConnectable }) {
  const [content, setContent] = useState("Sample Text Object");

  const onContentChange = useCallback((evt) => {
    setContent(evt.currentTarget.innerHTML);
  }, []);

  return (
    <div className="text-updater-node">
      <blockquote>
        <ContentEditable
          onChange={onContentChange}
          onBlur={onContentChange}
          disabled={false}
          html={content}
        />
      </blockquote>
    </div>
  );
}

export default TextNode;

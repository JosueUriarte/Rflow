import { useRef, useCallback } from "react";
import ContentEditable from "react-contenteditable";
// https://blixtdev.com/how-to-use-contenteditable-with-react/
// TODO: look into santizehtml, author says its used for xml attacks
// TODO: add dynamic logic node name (prob with data)
// TODO: Fix clicking on text to cursor mechanic
function TextNode({ data, isConnectable }) {
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
    <div className="text-updater-node">
      <blockquote>
        <ContentEditable
          onChange={handleContentChange}
          onClick={handleOnClick}
          disabled={false}
          html={text.current}
        />
      </blockquote>
    </div>
  );
}

export default TextNode;

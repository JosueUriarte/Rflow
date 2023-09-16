import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { TextareaAutosize } from "@mui/base";

// TODO: make rows bigger and make input start at middle of row.
// TODO: Optimize to get rid rendering error
function TextNode(node) {
  const { selected, data } = node;
  const [activeState, setActiveState] = useState(false);
  const [textAreaWidth, setTextAreaWidth] = useState(node.width); // Initial width
  const [textAreaHeight, setTextAreaHeight] = useState(node.height); // Initial height
  const textAreaRef = useRef(null);

  // used to change state when in active node state
  useEffect(() => {
    if (data.activeState) {
      setActiveState(false);
    } else {
      setActiveState(true);
    }
  }, [activeState, setActiveState, data.activeState]);

  const handleResize = (e, e2) => {
    // need this conditional to prevent multiple re-renders of the textArea
    if (e2.width !== textAreaWidth || e2.height !== textAreaHeight) {
      setTextAreaWidth(e2.width);
      setTextAreaHeight(e2.height);
      // Update the textarea's style using the ref
      textAreaRef.current.style.width = `${e2.width}px`;
      textAreaRef.current.style.height = `${e2.height}px`;
    }
  };

  return (
    <div>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        onResize={handleResize}
      />
      <Handle
        type="target"
        position={Position.Left}
        className={selected || data.activeState ? "hide" : ""}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={selected || data.activeState ? "hide" : ""}
      />

      <TextareaAutosize
        ref={textAreaRef}
        className="text-node"
        placeholder="Double Click to Edit"
        minRows={1}
        readOnly={activeState}
      />
    </div>
  );
}

export default TextNode;

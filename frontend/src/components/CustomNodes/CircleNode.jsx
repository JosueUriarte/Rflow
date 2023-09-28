import { useState, useEffect, useRef } from "react";
import { NodeResizer, Handle, Position } from "reactflow";
import TextInput from "./UserInputNodes/TextInput";
import { TextareaAutosize } from "@mui/base";

function CircleNode(node) {
  const { selected, data } = node;
  const [activeState, setActiveState] = useState(false);
  const [textAreaWidth, setTextAreaWidth] = useState(node.width); // Initial width
  const [textAreaHeight, setTextAreaHeight] = useState(node.height); // Initial height
  const textAreaRef = useRef(null);
  const nodeResizerRef = useRef(null);

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
    if (
      e2.width !== textAreaWidth ||
      e2.height !== nodeResizerRef.current.style.height ||
      e2.width !== nodeResizerRef.current.style.width
    ) {
      setTextAreaWidth(e2.width);
      setTextAreaHeight(e2.height);
      // Update the textarea's style using the ref
      textAreaRef.current.style.width = `${e2.width}px`;
      nodeResizerRef.current.style.width = `${e2.width}px`;
      nodeResizerRef.current.style.height = `${e2.height}px`;
    }
  };

  return (
    <div ref={nodeResizerRef} className="circle-node">
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
        className="circle-text-node"
        placeholder="Double Click to Edit"
        minRows={1}
        readOnly={activeState}
      />
    </div>
  );
}

export default CircleNode;

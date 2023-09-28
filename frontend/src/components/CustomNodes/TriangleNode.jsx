import { useRef, useState, useEffect } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { TextareaAutosize } from "@mui/material";
function TriangleNode(node) {
  const { selected, data } = node;
  const [activeState, setActiveState] = useState(false);
  const [textAreaWidth, setTextAreaWidth] = useState(node.width); // Initial width
  const [textAreaHeight, setTextAreaHeight] = useState(node.height); // Initial height
  const textAreaRef = useRef(null);
  const triangleNodeRef = useRef(null);

  const handleResize = (e, e2) => {
    // need this conditional to prevent multiple re-renders of the textArea
    if (
      e2.width !== textAreaWidth ||
      e2.height !== triangleNodeRef.current.style.height ||
      e2.width !== triangleNodeRef.current.style.width
    ) {
      setTextAreaWidth(e2.width);
      setTextAreaHeight(e2.height);
      // Update the textarea's style using the ref
      textAreaRef.current.style.width = `${e2.width}px`;
      triangleNodeRef.current.style.width = `${e2.width}px`;
      triangleNodeRef.current.style.height = `${e2.height}px`;
    }
  };

  useEffect(() => {
    if (data.activeState) {
      setActiveState(false);
    } else {
      setActiveState(true);
    }
  }, [activeState, setActiveState, data.activeState]);

  // TODO: add outline to triangle?
  // TODO: fix outline when resizing
  return (
    <div ref={triangleNodeRef} className="triangle-node">
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
        className="triangle-text-node"
        placeholder="Double Click to Edit"
        minRows={1}
        readOnly={activeState}
      />
    </div>
  );
}

export default TriangleNode;

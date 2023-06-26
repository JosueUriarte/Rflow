import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import TextObject from "./TextObject";

function CircleNode({ data, isConnectable }) {
  const [text, setText] = useState(data.label || "");

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const circleSize = 80; // Adjust the scaling factor as needed

  return (
    <div
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: "50%",
        background: "#555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <TextObject value={text} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default CircleNode;

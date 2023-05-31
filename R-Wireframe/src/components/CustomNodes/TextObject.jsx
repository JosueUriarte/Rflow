import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNodes.css';
const handleStyle = { left: 10 };

function TextObject({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <blockquote contentEditable="true">
        <p>Lets get it started in here</p>
    </blockquote>
  );
}

export default TextObject;

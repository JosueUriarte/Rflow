import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
    </div>
  );
}

export default TextUpdaterNode;

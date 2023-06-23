import { useCallback } from "react";
import { Handle, Position } from "reactflow";


function CircleNode({ data, isConnectable }) {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
        }, []);

    return (
    <div
    style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "#555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
        }}>

        <Handle
            type="source"
            position={Position.Bottom}
            style={{ background: '#555' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />

        <div className="text-stone-50"> Circle </div>
        
    </div>
    );
}

export default CircleNode;

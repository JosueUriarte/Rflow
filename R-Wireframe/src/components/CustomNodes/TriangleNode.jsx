import { useCallback } from "react";
import { Handle, Position } from "reactflow";


function TriangleNode({ data, isConnectable }) {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
        }, []);

    return (
    <div
        style={{
            width: "80px",
            height: "80px",
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "90px solid #555",
            textAlign: "center",
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

        <div className=" relative top-14 text-stone-100">Triangle</div>
        
    </div>
    );
}

export default TriangleNode;

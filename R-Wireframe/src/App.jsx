import React, { useCallback, useState, useRef, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  useKeyPress
} from 'reactflow';
import ToolBox from './components/ToolBox';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import 'reactflow/dist/style.css';

let id = 1;
const getId = () => `${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [toolBoxX, setToolBoxX] = useState(0);
  const [toolBoxY, setToolBoxY] = useState(0);

  const handlePaneClick = (e) => {
    e.preventDefault();

    const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: e.clientX - (flowBounds.left),
      y: e.clientY - (flowBounds.top),
    });

    setToolBoxX(position.left);
    setToolBoxY(position.top);

    const newNode = {
      id: getId(),
      position,
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  return (
    <>
      <div><h1>Creo</h1></div>
      <ReactFlowProvider>
        <div 
          className='reactflow-wrapper'
          style={{ border: '2px solid black', width: '80vw', height: '50vh' }}
          ref={reactFlowWrapper}
          >
          
          <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={setReactFlowInstance}
            selectionMode={SelectionMode.Partial}
            onPaneClick={handlePaneClick}
            fitView
            >
              <ToolBox/>
              <Controls />
              <Background color="#aaa" variant="lines" gap={20} size={2} />
          </ReactFlow>
          
          <div><p>Created by Josue U. and Miguelcloid R.</p></div>
          <div><p>Hire us please.</p></div>
        </div>
      </ReactFlowProvider>
    </>
  )
}

export default App

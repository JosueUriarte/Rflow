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

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

import ToolBox from './components/ToolBox';
const nodeTypes = {
};


import 'reactflow/dist/style.css';
import './main.css'


let id = 1;
const getId = () => `${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currNodeType, setCurrNodeType] = useState('input');

  const handlePaneClick = (e) => {
    e.preventDefault();

    const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: e.clientX - (flowBounds.left),
      y: e.clientY - (flowBounds.top),
    });

    const newNode = {
      type: currNodeType,
      id: getId(),
      position,
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));

  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <>
      <h1 className='text-3xl text-center uppercase'>Creo</h1>

      <div className='text-xs text-left flex mx-0'>
        <ReactFlowProvider className="">
          
          <ToolBox setCurrNodeType={setCurrNodeType} />
          <div 
            className='border-4 border-stone-500'
            style={{height: '70vh', width: '200vh'}}
            ref={reactFlowWrapper}
            >
            
            <ReactFlow 
              nodes={nodes} 
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              selectionMode={SelectionMode.Partial}
              onPaneClick={handlePaneClick}
              onConnect={onConnect}
              fitView
              >
                <Controls position={'bottom-right'}/>
                <Background  color="#aaa" variant="dots" gap={20} size={2}/>
            </ReactFlow>
            <div>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
      
      <div>
        <p>Created by Josue U. and Miguelcloid R.</p>
        <p>Hire us please.</p>
      </div>
    </>
  )
}

export default App

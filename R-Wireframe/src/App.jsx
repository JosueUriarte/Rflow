import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  applyNodeChanges,
  applyEdgeChanges,
  useKeyPress
} from "reactflow";
import ToolBox from "./components/ToolBox";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";

import "reactflow/dist/style.css";
import "./main.css";
import TextObject from './components/CustomNodes/TextObject';
import TextNode from './components/CustomNodes/TextNode';
import './components/CustomNodes/CustomNodes.css';

let id = 1;
const getId = () => `${id++}`;
const nodeTypes = { textObject: TextObject, textNode: TextNode};

function App() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currNodeType, setCurrNodeType] = useState('input');

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
 const handlePaneClick = (e) => {
    //e.preventDefault();

    console.log(e);

    const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: e.clientX - flowBounds.left,
      y: e.clientY - flowBounds.top,
    });

    const newNode = {
      type: currNodeType,
      id: getId(),
      position,
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  };
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (e) => {
      const targetIsPane = e.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

        //const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: e.clientX - flowBounds.left,
          y: e.clientY - flowBounds.top,
        });
        const id = getId();

        const newNode = {
          id,
          position,
          data: { label: `Node ${id}` },
        };

        setToolBoxX(position.left);
        setToolBoxY(position.top);
      
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
      }
    }
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

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
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
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
  );
}

export default App;

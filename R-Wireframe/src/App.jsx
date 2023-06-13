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
import Slider from '@mui/material/Slider';

import "reactflow/dist/style.css";
import "./main.css";
import TextObject from './components/CustomNodes/TextObject';
import TextNode from './components/CustomNodes/TextNode';
import './components/CustomNodes/CustomNodes.css';

let id = 2;
const getId = () => `${id++}`;
const nodeTypes = { textObject: TextObject, 
    textNode: TextNode
};

function App() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currNodeType, setCurrNodeType] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const handleSpawnNode = (e) => {
    
      if(e != null) {
        
        console.log("SPAWNING A NEW NODE")
        const newNode = {
          type: e,
          id: getId(),
          position: mousePosition,
          data: { label: `Node ${id}` },
        }

        setActiveNode(newNode.id);
        setNodes((nds) => nds.concat(newNode));
      }
      
  }

  const handlePaneClick = (e) => {
    setCurrNodeType(null)
    setActiveNode(null)
  }
  
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

        // We need to remove the wrapper bounds, in order to get the correct position
        const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

        const position = reactFlowInstance.project({
          x: e.clientX - flowBounds.left,
          y: e.clientY - flowBounds.top,
        });
        const id = getId();

        const newNode = {
          id,
          position: position,
          data: { label: `Node ${id}` },
        };
      
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
      }
    }
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  useEffect(() => {
    setNodes( (nds) => 
      nds.map((node) => {

        if(node.id == activeNode) {
          node.position = mousePosition
        }
        return node
      })
    )
  }, [mousePosition, setMousePosition, setNodes])

  useEffect( () => {

    const update = (e) => {

      const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

      setMousePosition(reactFlowInstance.project({
        x: e.clientX - flowBounds.left,
        y: e.clientY - flowBounds.top,
      }))
    }
    window.addEventListener('mousemove', update)
    return () => {
      window.removeEventListener('mousemove', update)
    }

  }, [mousePosition, reactFlowInstance, setMousePosition, setNodes])

  return (
    <>
    <div className="flex flex-col h-screen">

      <header>
        <h1 className='text-3xl text-center uppercase'>Creo</h1>
        <h1> ({mousePosition.x},{mousePosition.y}) </h1>
      </header>
    
      <main className='text-xs text-left flex-grow'>
        <ReactFlowProvider>
          
          <ToolBox setCurrNodeType={setCurrNodeType} currNodeType={currNodeType} onToolboxClicked={handleSpawnNode}/>
          <div 
            className='w-full h-full border-8 rounded-xl border-stone-500'
            ref={reactFlowWrapper}
            >
            
            <ReactFlow
              nodes={nodes} 
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              selectionMode={SelectionMode.Full}
              onPaneClick={handlePaneClick}
              onConnect={onConnect}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              fitView
              >
                <Controls position={'bottom-right'}/>
                <Background  color="#aaa" variant="dots" gap={20} size={2}/>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </main>
      
      <footer>
        <p>Created by Josue U. and Miguelcloid R. through the power of friendship 🥰</p>
      </footer>

    </div>
    </>
  );
}

export default App;

import React, { useCallback, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
// import './App.css'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  return (
    <>
      <div><h1>R-WireFrame</h1></div>
      <div style={{ border: '2px solid black', width: '50vw', height: '50vh' }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background variant="dots" gap={20} size={2} />
        </ReactFlow>
        <div><p>Created by Josue U. and Miguelcloid R.</p></div>
      </div>
    </>
  )
}

export default App

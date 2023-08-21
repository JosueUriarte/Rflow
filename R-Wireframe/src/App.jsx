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
} from "reactflow";
import ToolBox from "./components/ToolBox";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";

import sentencesData from "./friends.json";

import "reactflow/dist/style.css";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import TextObject from "./components/CustomNodes/UserInputFields/TextInput";
import CircleNode from "./components/CustomNodes/CircleNode";
import TriangleNode from "./components/CustomNodes/TriangleNode";
import TextNode from "./components/CustomNodes/TextNode";
import "./components/CustomNodes/CustomNodes.css";

const nodeTypes = {
  textObject: TextObject,
  textNode: TextNode,
  circleNode: CircleNode,
  triangleNode: TriangleNode,
};

let id = 0;
// TODO: make defaultViewport dynamic
let defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const getId = () => `${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [randomSentence, setRandomSentence] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currNodeType, setCurrNodeType] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const handleSpawnNode = (e) => {
    if (e != null) {
      let id = getId();
      const newNode = {
        type: e,
        id: id,
        position: mousePosition,
        data: { label: `Node ${id}` },
      };
      setActiveNode(newNode.id);
      setNodes((nds) => nds.concat(newNode));
    }
  };

  const handlePaneClick = (e) => {
    setCurrNodeType(null);
    setActiveNode(null);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((e) => {
    const targetIsPane = e.target.classList.contains("react-flow__pane");

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
      setEdges((eds) =>
        eds.concat({ id, source: connectingNodeId.current, target: id })
      );
    }
  });

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Generates a random sentence from predefined array at bottom left
  useEffect(() => {
    const sentences = sentencesData.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIndex]);
  }, []);

  // moves current active node based on mouse position
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == activeNode) {
          node.position = mousePosition;
        }
        return node;
      })
    );
  }, [mousePosition, setMousePosition, setNodes]);

  // updates viewPort based on mouse position
  useEffect(() => {
    const update = (e) => {
      const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

      setMousePosition(
        reactFlowInstance.project({
          x: e.clientX - flowBounds.left,
          y: e.clientY - flowBounds.top,
        })
      );
    };
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [mousePosition, reactFlowInstance, setMousePosition, setNodes]);

  // TODO: Seperate Header and Footer into own components
  return (
    <>
      <div className="flex flex-col h-screen">
        <header>
          <h1 className="text-3xl text-center uppercase p-3">Creo</h1>
          {/* <h1> ({mousePosition.x},{mousePosition.y}) </h1> */}
        </header>

        <main className="text-xs text-left flex-grow">
          <ReactFlowProvider>
            <ToolBox
              setCurrNodeType={setCurrNodeType}
              currNodeType={currNodeType}
              onToolboxClicked={handleSpawnNode}
            />
            <div
              className="w-full h-full border-8 border-stone-300"
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
                defaultViewport={defaultViewport}
              >
                <Controls position={"bottom-right"} />
                <Background color="#aaa" variant="dots" gap={20} size={2} />
                <MiniMap position={"top-right"} />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </main>

        <footer>
          <div className="footer-content">
            <p className="left-text">
              Created by Josue U. and Miguelcloid R. {randomSentence}
            </p>
            <p className="right-text">
              Check out the{" "}
              <a
                href="https://github.com/JosueUriarte/R-Wireframe/tree/main"
                className="github-link"
              >
                GitHub Project
              </a>
              <span className="logo-space">
                <FontAwesomeIcon icon={faGithub} />
              </span>{" "}
            </p>{" "}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

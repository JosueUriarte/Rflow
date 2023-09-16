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

import TextNode from "./components/CustomNodes/TextNode";
import CircleNode from "./components/CustomNodes/CircleNode";
import TriangleNode from "./components/CustomNodes/TriangleNode";
import TextInput from "./components/CustomNodes/UserInputNodes/TextInput";
import "./components/CustomNodes/CustomNodes.css";

const nodeTypes = {
  textNode: TextNode,
  textInput: TextInput,
  circleNode: CircleNode,
  triangleNode: TriangleNode,
};

let id = 0;
// TODO: make defaultViewport dynamic
// TODO: make font size dictate the min. resize of a node
// TODO: change all setNode logic to be more efficient and into one function
// TODO: props validiation for child nodes
// TODO: fix layout rendering error when resizing node (better conditionals and css)
// TODO: make two backgeounds with alternating big dot small dot
// TODO: put setNodes into one function instead of calling it multiple times
// TODO: fix node edge spawn bug with edge detection
// TODO: fix edge bug when resizing parent node and its connected to child node
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
  const [panOnDrag, setPanOnDrag] = useState(true);
  const [nodeSpawnMode, setNodeSpawnMode] = useState(false);
  const [isHandleSource, setHandleSource] = useState(false);

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
        data: { label: `Node ${id}`, activeState: false },
      };
      setNodeSpawnMode(true);
      setActiveNode(newNode.id);
      setNodes((nds) => nds.concat(newNode));
    }
  };

  const handlePaneClick = (e) => {
    // console.log('paneCLicked, e.clientX: ' + e.clientX);
    // console.log('paneCLicked, e.clientY: ' + e.clientY);
    setCurrNodeType(null);
    if (activeNode != null) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == activeNode && node.draggable == false) {
            node.data = {
              ...node.data,
              activeState: false,
            };
            node.draggable = true;
          }
          return node;
        })
      );
    }
    setActiveNode(null);
    setPanOnDrag(true);
    setNodeSpawnMode(false);
    //console.log('pane clicked');
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onConnectStart = useCallback((e, { nodeId, handleId, handleType }) => {
    connectingNodeId.current = nodeId;
    setHandleSource(handleType === "source");
  }, []);

  const onConnectEnd = useCallback((e) => {
    const targetIsPane = e.target.classList.contains("react-flow__pane");

    // adds node to pane
    if (targetIsPane && isHandleSource) {
      // We need to remove the wrapper bounds, in order to get the correct position
      const flowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: e.clientX - flowBounds.left,
        y: e.clientY - flowBounds.top,
      });
      const id = getId();
      let nodeType = null;

      for (const node of nodes) {
        if (node.id == connectingNodeId.current) {
          nodeType = node.type;
        }
      }

      const newNode = {
        type: nodeType != null ? nodeType : "",
        id,
        position: position,
        selected: false,
        data: { label: `Node ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id, source: connectingNodeId.current, target: id })
      );
    }
    setHandleSource(false);
  });

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleOnNodeClick = (e, selectedNode) => {
    //console.log('e.target: ' + e.target.className);
    //console.log('App.jsx: ' + JSON.stringify(selectedNode.data));

    if (activeNode != null && activeNode != selectedNode.id) {
      // another node was clicked
      setActiveNode(null);
    }

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == selectedNode.id) {
          let activeState = false;

          if (
            (activeNode != null && activeNode == selectedNode.id) ||
            e.target.className == "resize-handle nodrag"
          ) {
            // not the first iteration we click on this node, switch to active state
            activeState = true;
          }

          let draggable = activeState ? false : true;

          // set panondrag to false so node can be dragged without conflict
          setPanOnDrag(false);

          // console.log('draggable: ' + draggable);

          node.data = {
            ...node.data,
            activeState: activeState,
          };
          node.draggable = draggable;
        }
        return node;
      })
    );

    setActiveNode(selectedNode.id);
  };

  // Generates a random sentence from predefined array at bottom left
  useEffect(() => {
    const sentences = sentencesData.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIndex]);
  }, []);

  // moves current active node based on mouse position
  useEffect(() => {
    if (nodeSpawnMode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == activeNode) {
            node.position = mousePosition;
          }
          return node;
        })
      );
    }
  }, [mousePosition, nodeSpawnMode, activeNode, setMousePosition, setNodes]);

  // updates viewPort based on mouse position
  useEffect(() => {
    const update = (e) => {
      if (!reactFlowInstance || !reactFlowWrapper) {
        return;
      }

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

  // TODO: put this in own css file
  const reactFlowStyle = {
    background: "#F0F4F7",
  };

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
                style={reactFlowStyle}
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
                onNodeClick={handleOnNodeClick}
                panOnDrag={panOnDrag}
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

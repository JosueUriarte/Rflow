// import TextInput from "./UserInputFields/TextInput";
// import React, { useEffect, useState } from "react";
// import { TextareaAutosize } from '@mui/base';

// // didnt work but might need later on...
// function TextNode(node) {
//   const { selected, data } = node;
//   const [isResizing, setIsResizing] = useState(false);
//   const [newWidth, setWidth] = useState(35); // Initial width
//   const [newHeight, setHeight] = useState(35); // Initial height
//   const [initialMouseX, setInitialMouseX] = useState(null);
//   const [initialMouseY, setInitialMouseY] = useState(null);
//   const [activeState, setActiveState] = useState(false);

//   const handleMouseDown = (e) => {
//     console.log('setIsrezing: true');
//     setIsResizing(true);
//     setInitialMouseX(e.clientX);
//     setInitialMouseY(e.clientY);
//   };

//   const handleMouseUp = () => {
//     console.log('setIsrezing: false');
//     setIsResizing(false);
//   };

//   const handleMouseMove = (e) => {
//     console.log("ran22");
//     if (isResizing) {
//       const rect = e.currentTarget.getBoundingClientRect(); // Get the bounding box of the div
//       console.log('e.clientX: ' + e.clientX);
//       console.log('rect: ' + JSON.stringify(rect));

//       const deltaX = e.clientX - initialMouseX;
//       const deltaY = e.clientY - initialMouseY;

//       setWidth(newWidth + deltaX);
//       setHeight(newHeight + deltaY);

//       setInitialMouseX(e.clientX);
//       setInitialMouseY(e.clientY);
//     }
//   };

//   const unSelectedStyle = {
//     resize: 'none',
//     fontFamily: 'Roboto',
//     textAlign: 'center',
//     border: 'none',
//     borderStyle: 'none',
//     borderColor: 'Transparent',
//     boxShadow: 'none',
//   };

//   const selectedStyle = {
//     fontFamily: 'Roboto',
//     textAlign: 'center',
//     boxShadow: 'none',
//     resize: 'none'
//   };

//   // used to change state when in active node state
//   useEffect(() => {
//     if (data.activeState) {
//       setActiveState(false);
//     } else {
//       setActiveState(true);
//     }
//   }, [activeState, setActiveState, data.activeState]);

//   // useEffect(() => {
//   // });

//   return (
//     <div
//       className="text-updater-node"
//       onMouseUp={handleMouseUp}
//       onMouseMove={handleMouseMove}

//       style={{
//         width: `${newWidth}px`, // Set the width using newWidth
//         height: `${newHeight}px`, // Set the height using newHeight
//         border: "1px solid black",
//         position: "relative",
//       }}
//     >
//       <TextareaAutosize
//         style={selected ? selectedStyle : unSelectedStyle}
//         placeholder="Double Click to Edit"
//         readOnly={activeState}
//       />

//       {selected ? (
//         <button
//           className="resize-handle nodrag"
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//           style={{
//             width: "5px",
//             height: "5px",
//             backgroundColor: "blue",
//             cursor: "se-resize",
//             position: "absolute", // This ensures the handle stays in place
//             right: "-1px", // Adjust the position as needed
//             bottom: "-1px", // Adjust the position as needed
//             userSelect: "none", // Prevent text selection
//           }}
//         />
//       ) : null}
//     </div>
//   );
// }

// export default TextNode;

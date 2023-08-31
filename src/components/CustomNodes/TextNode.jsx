import TextareaAutosize from '@mui/material/TextareaAutosize';

// TODO: make rows bigger and make input start at middle of row.
function TextNode(node) {
  const {selected} = node;



  return (
      <TextareaAutosize
          className={selected ? "selected-text-updater-node" : "text-updater-node"}
          style={{resize: 'none', fontFamily: 'Roboto', outline: 'none', textAlign: 'center'}}  
          placeholder="Add text"
          minRows={1}
      />     
  );
}

export default TextNode;

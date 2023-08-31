import TextareaAutosize from '@mui/material/TextareaAutosize';

function TextInput() {
return (
    <TextareaAutosize 
      placeholder="Add text"
      minRows={1}
    /> 
  );
}

export default TextInput;

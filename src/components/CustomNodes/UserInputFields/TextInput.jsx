import { useState } from "react";
import { Handle, Position, useStore } from "reactflow";

function TextInput() {

  const handleOnDoubleClick = (e) => {
    // if (textareaRef.current) {
    //   textareaRef.current.setSelectionRange(
    //     textareaRef.current.value.length,
    //     textareaRef.current.value.length
    //   );
    // }
  };

  const [width, setWidth] = useState(0);

  const onChangeHandler = (e) => {
    setWidth(e.target.value.length);
  };

  const styles = {
    resize: "none",
  };


  return (
    <textarea style={{resize: 'none', width: width +'ch' }} onChange={onChangeHandler}></textarea>
  );
}

export default TextInput;

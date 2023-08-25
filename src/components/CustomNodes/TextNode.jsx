import React, { useState } from "react";
import TextInput from "./UserInputFields/TextInput";
// TODO: fix double click behavior to switch behavior to double click a word
function TextNode(data) {
  const [readBool, setReadBool] = useState(true);

  const handleOnDoubleClick = (e) => {
    //console.log(JSON.stringify(e));
  };

  const handleOnBlur = (e) => {
  };

  return (
    <div className="text-updater-node">
      <TextInput />
    </div>
  );
}

export default TextNode;

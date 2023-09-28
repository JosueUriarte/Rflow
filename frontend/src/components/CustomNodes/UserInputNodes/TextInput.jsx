import { TextareaAutosize } from '@mui/base';
import React, { useEffect, useState } from 'react';

function TextInput( node ) {
  const [activeState, setActiveState] = useState(false);

  // TODO: fix prop validiation error?
  const {selected, data} = node;

  const unSelectedStyle = {
    resize: 'none',
    fontFamily: 'Roboto',
    textAlign: 'center',
    border: 'none',
    borderStyle: 'none',
    borderColor: 'Transparent',
    boxShadow: 'none',
  };

  const selectedStyle = {
    fontFamily: 'Roboto',
    textAlign: 'center',
    boxShadow: 'none',
    resize: 'none'
  };

  // used to change state when in active node state
  useEffect(() => {
    if (data.activeState) {
      setActiveState(false);
    } else {
      setActiveState(true);
    }
  }, [activeState, setActiveState, data.activeState]);

  return (
      <TextareaAutosize
        style={selected ? selectedStyle : unSelectedStyle}
        placeholder="Double Click to Edit"
        readOnly={activeState}
      />
  );
}

export default TextInput;

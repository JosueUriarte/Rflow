import React from 'react'
import { Fab, Box } from '@mui/material';

function ToolBox( {toolBoxX, toolBoxY}) {

    return (
    <div style={{position: 'absolute'}}>
        <Fab 
            color="primary"
            aria-label="add"
            onClick={() => {
                alert('clicked');
                }}
            >
        </Fab>
        <Fab 
            color="secondary"
            aria-label="add"
            onClick={() => {
                alert('clicked');
                }}
            >
        </Fab>
    </div>
    )
}

export default ToolBox
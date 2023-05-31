import React from 'react'
import { Fab, Box } from '@mui/material';

function ToolBox( {toolBoxX, toolBoxY}) {

    return (
    <div className='w-3 '>
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
        <Fab 
            color="white"
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
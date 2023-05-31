import React, {useState} from 'react'
import { Handle, Position, Panel } from 'reactflow';
import { Fab, Box } from '@mui/material';


function ToolBox({setCurrNodeType}) {
    const [inputBool, setInputBool] = useState(true);
    const [outputBool, setOutputBool] = useState(false);
    const [defaultBool, setDefaultBool] = useState(false);

    const enableAllButtons = (e) => {
        setInputBool(false)
        setOutputBool(false)
        setDefaultBool(false)
    }

    const handleInputClick = (e) => {
        enableAllButtons()
        setInputBool(true)
        setCurrNodeType('input')
    }
    const handleOutputClick = (e) => {
        enableAllButtons()
        setOutputBool(true)
        setCurrNodeType('output')

    }
    const handleDefaultClick = (e) => {
        enableAllButtons()
        setDefaultBool(true)
        setCurrNodeType('default')
    }

    return (
            <div className= 'w-14 flex-col bg-gradient-to-l from-sky-500 to-indigo-500'>
                <Fab
                className='bg-stone-500'
                color="success"
                aria-label="add"
                disabled={inputBool}
                onClick={handleInputClick}
                >
                    <p className='text-xs'>input</p>
                </Fab>
                <Fab 
                color="error"
                aria-label="add"
                disabled={outputBool}
                onClick={handleOutputClick}
                >
                    <p className='text-xs'>output</p>
                </Fab>
                <Fab 
                color="primary"
                aria-label="add"
                disabled={defaultBool}
                onClick={handleDefaultClick}
                >
                    <p className='text-xs'>default</p>
                </Fab>
                
            </div>
    )
}

export default ToolBox
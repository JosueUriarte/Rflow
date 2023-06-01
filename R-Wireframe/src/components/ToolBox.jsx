import React, {useState} from 'react'
import { Fab } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarkAddSharpIcon from '@mui/icons-material/BookmarkAddSharp';
import BookmarkRemoveSharpIcon from '@mui/icons-material/BookmarkRemoveSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';


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
            <div className= 'btn-group btn-group-vertical rounded-3xl gap-3 z-10 mx-5 mt-20 p-3 px absolute bg-stone-500'>
                <Fab
                className='bg-stone-500'
                aria-label="add"
                disabled={inputBool}
                onClick={handleInputClick}
                >
                    <BookmarkAddSharpIcon/>
                </Fab>

                <Fab 
                aria-label="add"
                disabled={outputBool}
                onClick={handleOutputClick}
                >
                    <BookmarkRemoveSharpIcon/>
                </Fab>

                <Fab 
                color="white"
                aria-label="add"
                disabled={defaultBool}
                onClick={handleDefaultClick}
                >
                    <BookmarkSharpIcon/>
                </Fab>
                
            </div>
    )
}

export default ToolBox
import React, {useState} from 'react'
import { Fab } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarkAddSharpIcon from '@mui/icons-material/BookmarkAddSharp';
import BookmarkRemoveSharpIcon from '@mui/icons-material/BookmarkRemoveSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';

//
const buttonConfig = [
    {nodetype: 'input', icon: <BookmarkAddSharpIcon/>}, 
    {nodetype:'output', icon: <BookmarkRemoveSharpIcon/>}, 
    {nodetype: 'default', icon: <BookmarkSharpIcon/>},
    {nodetype: 'something', icon: <BookmarkSharpIcon/>},
]

function ToolBox({setCurrNodeType, currNodeType}) {

    const handleButtonClick = (e) => {
        setCurrNodeType(e)
    }

    return (
            <div className= 'btn-group btn-group-vertical rounded-3xl gap-3 z-10 mx-5 mt-20 p-3 px absolute bg-stone-500'>
                
                {buttonConfig.map(config => (<Fab
                    key= {config.nodetype}
                    className='bg-stone-500'
                    aria-label="add"
                    disabled={config.nodetype != currNodeType}
                    onClick={() => handleButtonClick(config.nodetype)}
                    >
                        {config.icon}
                    </Fab>))
                }
                
            </div>
    )
}

export default ToolBox
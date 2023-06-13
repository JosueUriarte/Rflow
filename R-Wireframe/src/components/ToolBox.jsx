import React, {useState} from 'react'
import { Fab } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import BookmarkRemoveSharpIcon from '@mui/icons-material/BookmarkRemoveSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RttIcon from '@mui/icons-material/Rtt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InputIcon from '@mui/icons-material/Input';



//
const buttonConfig = [
    {nodetype: 'input', icon: <AddBoxIcon/>}, 
    {nodetype:'default', icon: <CheckBoxOutlineBlankIcon/>}, 
    {nodetype: 'output', icon: <IndeterminateCheckBoxIcon/>},
    {nodetype: 'textNode', icon: <TextSnippetIcon/>},
    {nodetype: 'textObject', icon: <RttIcon/>},
]

function ToolBox({setCurrNodeType, currNodeType, onToolboxClicked}) {

    const handleButtonClick = (e) => {
        setCurrNodeType(e)
        if(onToolboxClicked) onToolboxClicked(e);
    }

    return (
            <div className=
            'btn-group btn-group-vertical rounded-3xl gap-3 z-10 mx-5 mt-20 p-3 px absolute bg-stone-500'>
                
                {buttonConfig.map(config => (<Fab
                    key= {config.nodetype}
                    className='bg-stone-500'
                    aria-label="add"
                    disabled={currNodeType != null && config.nodetype != currNodeType}
                    onClick={() => handleButtonClick(config.nodetype)}
                    >
                        {config.icon}
                    </Fab>))
                }
                
            </div>
    )
}

export default ToolBox
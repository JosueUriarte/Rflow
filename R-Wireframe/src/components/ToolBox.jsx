import React, {useState} from 'react'
import { Fab } from '@mui/material';
import RttIcon from '@mui/icons-material/Rtt';
import LensIcon from '@mui/icons-material/Lens';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Icon } from '@iconify/react';



const buttonConfig = [
    {nodetype: 'input', icon: <SquareRoundedIcon/>}, 
    {nodetype: 'circleNode', icon: <LensIcon/>},
    {nodetype: 'triangleNode', icon: <Icon icon="mdi:triangle" width="25" />},
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
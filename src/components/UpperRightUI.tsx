import React from 'react'
import { ReactComponent as Settings} from "../svgs/cog-small.svg";
import { ReactComponent as Help} from "../svgs/question-mark-round.svg";

interface Props {
    
}

function UpperRightUI({}: Props): JSX.Element{
    return (
        <div className="flex items-end my-1">
           <Settings className="h-6 mx-3"/>
           <Help className="h-6"/>
        </div>
    )
}

export default UpperRightUI;
import React from 'react'

import { ReactComponent as TurnAnticlockwise} from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as TurnClockwise} from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as Rewind} from "../svgs/backward.svg";


interface Props {
    boardWidth: number;
}

function LeftBtnArea({boardWidth}: Props): JSX.Element{
    return (
        <div style={{ width: `${boardWidth/2}px`}} className="my-4" >
           
           <div className="flex justify-start">
               <div className="h-10 w-12  bg-gray-400 relative">
                <TurnAnticlockwise className="h-8 absolute" style={{left: "-200px", marginTop: "5px"}}/>
               </div>
                <div className="h-10 w-12 mx-2 bg-gray-400 relative">
                <TurnClockwise className="h-8 absolute" style={{transform: "scaleX(-1)", left: "-200px", marginTop: "5px"}}/>
                </div>
           </div>
           <div className="my-4 mx-8 bg-gray-400 h-10 w-12 relative">
           <Rewind className="h-6 mx-2 absolute" style={{top: "8px"}}/>
           </div>


        </div>
    )
}

export default LeftBtnArea;


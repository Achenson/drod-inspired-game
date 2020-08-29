import React from 'react'

interface Props {
   currentTurn: number
}

function Turns({currentTurn}: Props): JSX.Element{
    return (
        <div>
            {currentTurn}
        </div>
    )
}

export default Turns;
import React from 'react'

interface Props {
    
}

function NewGameBtn({}: Props): JSX.Element{
    return (
        <div className="text-center my-2">
           <button>
               New game
           </button>
        </div>
    )
}

export default NewGameBtn;
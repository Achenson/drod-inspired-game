import React from 'react'

interface Props {
    
}

function NewGameBtn({}: Props): JSX.Element{
    return (
        <div className="text-center my-4" style={{fontSize: "0.7rem" }} >
           <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-sm">
               NEW GAME
           </button>
        </div>
    )
}

export default NewGameBtn;
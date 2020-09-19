import React from 'react'

interface Props {
    newGame: () => void;
}

function NewGameBtn({newGame}: Props): JSX.Element{
    return (
        <div className="text-center my-5" style={{fontSize: "0.7rem" }} >
           <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-sm" onClick={newGame}>
               NEW GAME
           </button>
        </div>
    )
}

export default NewGameBtn;
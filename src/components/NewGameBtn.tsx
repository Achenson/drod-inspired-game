import React from 'react'

interface Props {
    newGame: () => void;
}

function NewGameBtn({newGame}: Props): JSX.Element{
    return (
        <div className="text-center my-5" style={{fontSize: "0.7rem" }} >
           <button className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm" onClick={newGame}>
               TEST BTN
           </button>
        </div>
    )
}

export default NewGameBtn;
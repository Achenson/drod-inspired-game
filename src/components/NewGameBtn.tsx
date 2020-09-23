import React from 'react'

interface Props {
    newGame: () => void;
    setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function NewGameBtn({newGame, setTextOnDisplay}: Props): JSX.Element{
    return (
        <div className="text-center my-5" style={{fontSize: "0.7rem" }} >
           <button className="bg-black hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-sm" onClick={newGame}
           onMouseEnter={() => {
        
            setTextOnDisplay("Keyboard: N");
          }}
          onMouseLeave={() => {
           
            setTextOnDisplay("");
          }}
           >
               TEST BTN
           </button>
        </div>
    )
}

export default NewGameBtn;
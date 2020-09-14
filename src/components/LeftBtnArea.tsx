import React from "react";

import { ReactComponent as TurnAnticlockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as TurnClockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as Rewind } from "../svgs/backward.svg";

interface Props {
  boardWidth: number;
  // handleKeyDown: (eventString: string) => void;
  handleKeysOrBtns: (command: string) => void;
}

function LeftBtnArea({ boardWidth, handleKeysOrBtns }: Props): JSX.Element {
  return (
    <div style={{ width: `${boardWidth / 2}px` }} className="my-4">
      <div className="flex justify-start">
        <button
          className="h-10 w-12  bg-gray-400 relative"
          onClick={(e) => {
            // e.preventDefault()
            handleKeysOrBtns("KeyQ");
            console.log("KeyQ");
          }}
        >
          <TurnAnticlockwise
            className="h-8 absolute"
            style={{ left: "-200px", marginTop: "-15px" }}
          />
        </button>
        <button className="h-10 w-12 mx-2 bg-gray-400 relative"
          onClick={(e) => {
            // e.preventDefault()
            handleKeysOrBtns("KeyW");
            console.log("KeyW");
          }}
        
        >
          <TurnClockwise
            className="h-8 absolute"
            style={{
              transform: "scaleX(-1)",
              left: "-200px",
              marginTop: "-15px",
            }}
            
          />
        </button>
      </div>
      <button className="my-4 mx-8 bg-gray-400 h-10 w-12 relative"
          onClick={(e) => {
            // e.preventDefault()
            handleKeysOrBtns("Backspace");
            console.log("Backspace");
          }}
      >
        <Rewind className="h-6 mx-2 absolute" style={{ top: "8px" }} />
      </button>
    </div>
  );
}

export default LeftBtnArea;

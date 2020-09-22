import React from "react";
import { useState } from "react";

import { ReactComponent as TurnAnticlockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as TurnClockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as Rewind } from "../svgs/backward.svg";

interface Props {
  boardWidth: number;
  // handleKeyDown: (eventString: string) => void;
  handleKeysOrBtns: (command: string) => void;
}

function LeftBtnArea({ boardWidth, handleKeysOrBtns }: Props): JSX.Element {
  const [btnBackground, setBtnBackground] = useState("bg-gray-400");
  const [btnBackground_2, setBtnBackground_2] = useState("bg-gray-400");
  const [btnBackground_3, setBtnBackground_3] = useState("bg-gray-400");

  const touchBtnColorOnHover = "bg-purple-400";

  return (
    <div style={{ width: `${boardWidth / 2}px` }} className="my-4">
      <div className="flex justify-start">
        <button
          className={`h-10 w-12 relative ${btnBackground}`}
          onClick={(e) => {
            // e.preventDefault()
            handleKeysOrBtns("KeyQ");
            console.log("KeyQ");
          }}
          onMouseEnter={() => {
            setBtnBackground(touchBtnColorOnHover);
          }}
          onMouseLeave={() => {
            setBtnBackground("bg-gray-400");
          }}
        >
          <TurnAnticlockwise
            className="h-8 w-8 absolute"
            style={{ left: "8px", marginTop: "-15px" }}
          />
        </button>
        <button
          className={`h-10 w-12 mx-2 ${btnBackground_2} relative`}
          onClick={(e) => {
            // e.preventDefault()
            handleKeysOrBtns("KeyW");
            console.log("KeyW");
          }}
          onMouseEnter={() => {
            setBtnBackground_2(touchBtnColorOnHover);
          }}
          onMouseLeave={() => {
            setBtnBackground_2("bg-gray-400");
          }}
        >
          <TurnClockwise
            className="h-8 w-8 absolute"
            style={{
              transform: "scaleX(-1)",
              left: "8px",
              marginTop: "-15px",
            }}
          />
        </button>
      </div>
      <button
        className={`my-4 mx-8 ${btnBackground_3} h-10 w-12 relative`}
        onClick={(e) => {
          // e.preventDefault()
          handleKeysOrBtns("Backspace");
          console.log("Backspace");
        }}
        onMouseEnter={() => {
          setBtnBackground_3(touchBtnColorOnHover);
        }}
        onMouseLeave={() => {
          setBtnBackground_3("bg-gray-400");
        }}
      >
        <Rewind className="h-6 mx-2 absolute" style={{ top: "8px" }} />
      </button>
    </div>
  );
}

export default LeftBtnArea;

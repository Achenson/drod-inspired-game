import React from "react";

import { ReactComponent as TurnAnticlockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as TurnClockwise } from "../svgs/curved-arrow-2261.svg";
import { ReactComponent as Rewind } from "../svgs/backward.svg";

interface Props {
  boardWidth: number;
  handleKeysOrBtnsWrapper: (command: string) => void;
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function LeftBtnArea({
  boardWidth,
  handleKeysOrBtnsWrapper,
  setTextOnDisplay,
}: Props): JSX.Element {
  return (
    <div style={{ width: `${boardWidth / 2}px` }} className="my-4">
      <div className="flex justify-start">
        <button
          className="h-10 w-12 relative bg-gray-400 hover:bg-purple-400"
          onClick={() => {
            handleKeysOrBtnsWrapper("KeyQ");
          }}
          onMouseEnter={() => {
            setTextOnDisplay("Keyboard: Q");
          }}
          onMouseLeave={() => {
            setTextOnDisplay("");
          }}
        >
          <TurnAnticlockwise
            className="h-8 w-8 absolute"
            style={{ left: "8px", marginTop: "-15px" }}
          />
        </button>
        <button
          className={`h-10 w-12 mx-2 bg-gray-400 relative hover:bg-purple-400`}
          onClick={() => {
            handleKeysOrBtnsWrapper("KeyW");
          }}
          onMouseEnter={() => {
            setTextOnDisplay("Keyboard: W");
          }}
          onMouseLeave={() => {
            setTextOnDisplay("");
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
        className={`my-4 mx-8 bg-gray-400 h-10 w-12 relative hover:bg-purple-400`}
        onClick={() => {
          handleKeysOrBtnsWrapper("KeyR");
        }}
        onMouseEnter={() => {
          setTextOnDisplay("Keyboard: R");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      >
        <Rewind className="h-6 mx-2 absolute" style={{ top: "8px" }} />
      </button>
    </div>
  );
}

export default LeftBtnArea;

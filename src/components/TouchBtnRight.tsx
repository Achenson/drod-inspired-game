import React from "react";

import { ReactComponent as ArrowUp } from "../svgs/arrowUp.svg";
import { ReactComponent as Wait } from "../svgs/sand-clock-half.svg";

interface Props {
  btnType: string;
  handleKeysOrBtnsWrapper: (command: string) => void;
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function TouchBtnRight({
  btnType,
  handleKeysOrBtnsWrapper,
  setTextOnDisplay,
}: Props): JSX.Element {
  let arrowDirection = "";

  let keyToPress: string = "Numpad";

  switch (btnType) {
    case "nw":
      arrowDirection = "transform -rotate-45";
      keyToPress = "Numpad7";
      break;
    case "n":
      arrowDirection = "";
      keyToPress = "Numpad8";
      break;
    case "ne":
      arrowDirection = "transform rotate-45";
      keyToPress = "Numpad9";
      break;
    case "w":
      arrowDirection = "transform -rotate-90";
      keyToPress = "Numpad4";
      break;
    case "e":
      arrowDirection = "transform rotate-90";
      keyToPress = "Numpad6";
      break;
    case "sw":
      arrowDirection = "transform rotate-225";
      keyToPress = "Numpad1";
      break;
    case "s":
      arrowDirection = "transform rotate-180";
      keyToPress = "Numpad2";
      break;
    case "se":
      arrowDirection = "transform rotate-135";
      keyToPress = "Numpad3";
      break;
    default:
      arrowDirection = "";
  }

  return btnType === "wait" ? (
    <button
      className="h-8 w-8 bg-gray-400 relative hover:bg-purple-400"
      onClick={(e) => {
        handleKeysOrBtnsWrapper("Numpad5");
      }}
      onMouseEnter={() => {
        setTextOnDisplay("Keyboard: Numpad 5");
      }}
      onMouseLeave={() => {
        setTextOnDisplay("");
      }}
    >
      <Wait className="h-6 absolute" style={{ left: "6px", top: "4px" }} />
    </button>
  ) : (
    <button
      className="h-8 w-8 bg-gray-400 relative hover:bg-purple-400"
      onClick={(e) => {
        handleKeysOrBtnsWrapper(keyToPress);
      }}
      onMouseEnter={() => {
        setTextOnDisplay(
          `Keyboard: ${keyToPress.slice(0, 6)} ${keyToPress.slice(6)}`
        );
      }}
      onMouseLeave={() => {
        setTextOnDisplay("");
      }}
    >
      <ArrowUp className={`${arrowDirection} h-8`} />
    </button>
  );
}

export default TouchBtnRight;

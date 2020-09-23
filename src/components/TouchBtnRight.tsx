import React from "react";

import { ReactComponent as ArrowUp } from "../svgs/arrowUp.svg";
import { ReactComponent as Wait } from "../svgs/sand-clock-half.svg";

interface Props {
  btnType: string;
  handleKeysOrBtns: (command: string) => void;
}

function TouchBtnRight({ btnType, handleKeysOrBtns }: Props): JSX.Element {
  let arrowDirection = "";

  let keyToPress: string;

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
        handleKeysOrBtns("Numpad5");
      }}
    >
      <Wait className="h-6 absolute" style={{ left: "-37px", top: "4px" }} />
    </button>
  ) : (
    <button
      className="h-8 w-8 bg-gray-400 relative hover:bg-purple-400"
      onClick={(e) => {
        handleKeysOrBtns(keyToPress);
      }}
    >
      <ArrowUp className={`${arrowDirection} h-8`} />
    </button>
  );
}

export default TouchBtnRight;

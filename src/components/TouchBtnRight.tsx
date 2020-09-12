import React from "react";

import { ReactComponent as ArrowUp } from "../svgs/arrowUp.svg";
import { ReactComponent as Wait } from "../svgs/sand-clock-half.svg";

interface Props {
  btnType: string;
}

function TouchBtnRight({ btnType }: Props): JSX.Element {
  let arrowDirection = "";

  switch (btnType) {
    case "nw":
        arrowDirection = "transform -rotate-45";

      break;
    case "n":
      arrowDirection = "";

      break;
    case "ne":
      arrowDirection = "transform rotate-45";

      break;
    case "w":
      arrowDirection = "transform -rotate-90";

      break;
    case "e":
      arrowDirection = "transform rotate-90";

      break;
    case "sw":
      arrowDirection = "transform rotate-225";

      break;
    case "s":
      arrowDirection = "transform rotate-180";

      break;
    case "se":
      arrowDirection = "transform rotate-135";

      break;
    default:
      arrowDirection = "";
  }

  return (
    <div className="h-8 w-8 bg-gray-400 relative">
      {btnType === "wait" ? (
        <Wait className="h-6 absolute" style={{left: "-37px", top: "4px"}} />
      ) : (
        <ArrowUp className={`${arrowDirection} h-8`}/>
      )}
    </div>
  );
}

export default TouchBtnRight;

import React from "react";
import TouchBtnRight from "./TouchBtnRight";

interface Props {
    boardWidth: number
}

function RightBtnArea({boardWidth}: Props): JSX.Element {
  const buttonsRight = ["nw", "n", "ne", "w", "wait", "e", "sw", "s", "se"];

  return (
    <div className="grid grid-cols-3 col-gap-0" style={{ width: `${boardWidth/2}px` }}>
      {buttonsRight.map((el, i) => {
        return <TouchBtnRight key={i} btnType={el} />;
      })}
    </div>
  );
}

export default RightBtnArea;

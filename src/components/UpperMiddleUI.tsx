import React from "react";

interface Props {
  currentTurn: number;
}

function UpperMiddleUI({ currentTurn }: Props): JSX.Element {
  return (
    <div>
      <p>Round</p>
      <p className="text-center font-droid-serif text-lg">{currentTurn}12</p>
    </div>
  );
}

export default UpperMiddleUI;

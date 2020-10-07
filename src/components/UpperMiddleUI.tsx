import React from "react";

interface Props {
  currentTurn: number;
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function UpperMiddleUI({ currentTurn, setTextOnDisplay }: Props): JSX.Element {
  return (
    <div className="cursor-default ">
      <p>Round</p>
      <p
        className="text-center font-droid-serif text-lg hover:bg-gray-200 rounded"
        onMouseEnter={() => {
          setTextOnDisplay("Current round");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
        onTouchStart={() => {
          setTextOnDisplay("Most Rounds Survived");
        }}
      >
        {currentTurn}
      </p>
    </div>
  );
}

export default UpperMiddleUI;

import React from "react";

interface Props {
  currentTurn: number;
  setTextOnHover: React.Dispatch<React.SetStateAction<string>>;
}

function UpperMiddleUI({ currentTurn, setTextOnHover }: Props): JSX.Element {
  return (
    <div className="cursor-default">
      <p>Round</p>
      <p
        className="text-center font-droid-serif text-lg"
        onMouseEnter={() => {
          setTextOnHover("Current round");
        }}
        onMouseLeave={() => {
          setTextOnHover("");
        }}
      >
        {currentTurn}12
      </p>
    </div>
  );
}

export default UpperMiddleUI;

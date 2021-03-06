import React from "react";

import { ReactComponent as Medal } from "../svgs/medal.svg";

interface Props {
  topScore: number | React.Dispatch<React.SetStateAction<number>>;
  enemies: number[];
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function UpperLeftUI({ topScore, setTextOnDisplay }: Props): JSX.Element {
  let medalColor;
  let medalOnHoverText: string;

  if (topScore < 100) {
    medalColor = "black";
    medalOnHoverText = "No medal awarded";
  }

  if (topScore >= 100 && topScore < 175) {
    medalColor = "#cd7f32";
    medalOnHoverText = "Bronze medal awarded";
  }

  if (topScore >= 175 && topScore < 250) {
    medalColor = "gray";
    medalOnHoverText = "Silver medal awarded";
  }

  if (topScore >= 250) {
    medalColor = "gold";
    medalOnHoverText = "Gold medal awarded!";
  }

  return (
    <div className="cursor-default">
      <p>Top score</p>
      <div className="flex justify-around mb-px">
        <p
          className="text-center text-lg text-green-600 hover:bg-gray-200 rounded w-8"
          style={{fontFamily: "sans-serif"}}
          onMouseEnter={() => {
            setTextOnDisplay("Most Rounds Survived");
          }}
          onMouseLeave={() => {
            setTextOnDisplay("");
          }}
          onTouchStart={() => {
            setTextOnDisplay("Most Rounds Survived");
          }}
        >
          {topScore.toString()}
        </p>
        <div
          className={`w-8 hover:bg-gray-200 rounded-md flex justify-center items-center`}
        >
          <Medal
            className={`h-6 fill-current`}
            style={{ color: `${medalColor}` }}
            onMouseEnter={() => {
              setTextOnDisplay(medalOnHoverText);
            }}
            onMouseLeave={() => {
              setTextOnDisplay("");
            }}
            onTouchStart={() => {
              setTextOnDisplay(medalOnHoverText);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UpperLeftUI;

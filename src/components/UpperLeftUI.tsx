import React from "react";

import { ReactComponent as Medal } from "../svgs/medal.svg";

interface Props {
  enemiesKilled: number;
  topScore: string | React.Dispatch<React.SetStateAction<string>>;
  enemies: number[];
  setTextOnHover: React.Dispatch<React.SetStateAction<string>>;
}

function UpperLeftUI({
  enemiesKilled,
  topScore,
  enemies,
  setTextOnHover,
}: Props): JSX.Element {
  let medalColor;
  let medalOnHoverText: string;

  let topScoreInt = parseInt(topScore as string);

  if (topScoreInt < 100) {
    medalColor = "black";
    medalOnHoverText = "No medal awarded";
  }

  if (topScoreInt >= 100 && topScoreInt < 175) {
    medalColor = "#cd7f32";
    medalOnHoverText = "Bronze medal awarded";
  }

  if (topScoreInt >= 175 && topScoreInt < 250) {
    medalColor = " #c0c0c0";
    medalOnHoverText = "Silver medal awarded";
  }

  if (topScoreInt >= 250) {
    medalColor = "gold";
    medalOnHoverText = "Gold medal awarded!";
  }

  return (
    <div className="cursor-default">
      <p
        onMouseEnter={() => {
          setTextOnHover("Most Rounds Survived");
        }}
        onMouseLeave={() => {
          setTextOnHover("");
        }}
      >
        Top score
      </p>
      <div className="flex justify-around mb-1">
        <p
          className="text-center font-droid-serif text-lg text-green-600"
          onMouseEnter={() => {
            setTextOnHover("Most Rounds Survived");
          }}
          onMouseLeave={() => {
            setTextOnHover("");
          }}
        >
          {topScore}
        </p>
        <Medal
          className="h-6 fill-current"
          style={{ color: `${medalColor}` }}
          onMouseEnter={() => {
            setTextOnHover(medalOnHoverText);
          }}
          onMouseLeave={() => {
            setTextOnHover("");
          }}
        />
      </div>

      {/* <p>kills: {enemiesKilled}</p> */}
      {/* <p>nr of enemies: {enemies.length}</p> */}
      {/* <p>enemies locations: {enemies.map( (el, i) => {
    return el + ", "
  } ) 

  }</p> */}
    </div>
  );
}

export default UpperLeftUI;

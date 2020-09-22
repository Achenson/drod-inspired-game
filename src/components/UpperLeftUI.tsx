import React from "react";

import { ReactComponent as Medal } from "../svgs/medal.svg";

interface Props {
  enemiesKilled: number;
  topScore: string | React.Dispatch<React.SetStateAction<string>>;
  enemies: number[];
}

function UpperLeftUI({ enemiesKilled, topScore, enemies }: Props): JSX.Element {


  let medalColor;

  let topScoreInt = parseInt(topScore as string)

  if (topScoreInt < 100) {
    medalColor="black"
  }

  if (topScoreInt >= 100 && topScoreInt < 175) {
    medalColor="#cd7f32"
  }

  if (topScoreInt >= 175 && topScoreInt < 250) {
    medalColor=" #c0c0c0"
  }

  if (topScoreInt >= 250) {
    medalColor="gold"
  }






  return (
    <div>
      <p>Top score</p>
      <div className="flex justify-around mb-1">
        <p className="text-center font-droid-serif text-lg">{topScore}</p>
        <Medal className="h-6 fill-current" style={{color: `${medalColor}`}} />
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

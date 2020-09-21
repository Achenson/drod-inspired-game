import React from "react";

import { ReactComponent as Medal } from "../svgs/medal.svg";

interface Props {
  enemiesKilled: number;
  topScore: string | React.Dispatch<React.SetStateAction<string>>;
  enemies: number[];
}

function UpperLeftUI({ enemiesKilled, topScore, enemies }: Props): JSX.Element {
  return (
    <div>
      <p>Top score</p>
      <div className="flex justify-around mb-1">
        <p className="text-center font-droid-serif text-lg">{topScore}23</p>
        <Medal className="h-6 fill-current text-gray-900" />
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

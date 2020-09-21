import React from "react";

import { ReactComponent as Medal } from "../svgs/medal.svg";

interface Props {
  enemiesKilled: number;
  topScore: string | React.Dispatch<React.SetStateAction<string>>;
  enemies: number[];
}

function Turns({ enemiesKilled, topScore, enemies }: Props): JSX.Element {
  return (
    <div className="flex">
      <div>
        <p className="-my-1">Top score</p>
        <p className="text-center">{topScore}</p>

        {/* <p>kills: {enemiesKilled}</p> */}
        {/* <p>nr of enemies: {enemies.length}</p> */}
        {/* <p>enemies locations: {enemies.map( (el, i) => {
    return el + ", "
  } ) 

  }</p> */}
      </div>
      <div className="flex items-center ml-1">
        <Medal className="h-8 fill-current text-gray-900" />
      </div>
    </div>
  );
}

export default Turns;

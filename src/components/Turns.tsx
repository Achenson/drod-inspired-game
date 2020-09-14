import React from "react";

interface Props {
  currentTurn: number;
  enemiesKilled: number;
  topScore: string | React.Dispatch<React.SetStateAction<string>>;
  enemies: number[];
}

function Turns({ currentTurn, enemiesKilled, topScore, enemies }: Props): JSX.Element {
  return (
    <div>
      <p>highest award: {topScore}</p>
      <p>best score: {topScore}</p>
      <p>turns passed: {currentTurn}</p>
      {/* <p>kills: {enemiesKilled}</p> */}
      <p>nr of enemies: {enemies.length}</p>
  <p>enemies locations: {enemies.map( (el, i) => {
    return el + ", "
  } ) 

  }</p>

    </div>
  );
}

export default Turns;

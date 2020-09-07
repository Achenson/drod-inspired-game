import React from "react";

interface Props {
  currentTurn: number;
  enemiesKilled: number;
  recordScore: string;
  enemies: number[];
}

function Turns({ currentTurn, enemiesKilled, recordScore, enemies }: Props): JSX.Element {
  return (
    <div>
      <p>turn: {currentTurn}</p>
      <p>record: {recordScore}</p>
      <p>kills: {enemiesKilled}</p>
      <p>nr of enemies: {enemies.length}</p>
  <p>enemies locations: {enemies.map( (el, i) => {
    return el + ", "
  } ) 

  }</p>
    </div>
  );
}

export default Turns;

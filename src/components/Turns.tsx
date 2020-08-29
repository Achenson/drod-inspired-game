import React from "react";

interface Props {
  currentTurn: number;
  enemiesKilled: number;
}

function Turns({ currentTurn, enemiesKilled }: Props): JSX.Element {
  return (
    <div>
      <p>turn: {currentTurn}</p>
      <p>kills: {enemiesKilled}</p>
    </div>
  );
}

export default Turns;

import React from "react";

interface Props {
  currentTurn: number;
  enemiesKilled: number;
  recordScore: string;
}

function Turns({ currentTurn, enemiesKilled, recordScore }: Props): JSX.Element {
  return (
    <div>
      <p>turn: {currentTurn}</p>
      <p>record: {recordScore}</p>
      <p>kills: {enemiesKilled}</p>
    </div>
  );
}

export default Turns;

import {
  death_mp3,  
  medal_mp3,
  topScore_mp3,
} from "./audio";

import playAudio from "./playAudio"

import { HeroObj } from "./interfaces";

export default function makeRecordScore(
  currentTurn: number,
  topScore: number | React.Dispatch<React.SetStateAction<number>>,
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>,
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>,
  newGameOrDeath: "new game" | "death"
) {
  // >= sign, because the next turn in which hero dies still counts
  if (currentTurn >= topScore) {
    (setTopScore as React.Dispatch<React.SetStateAction<number>>)(
      (currentTurn + 1)
    );
    // localStorage.setItem("record", (currentTurn + 1).toString());

    if (
      currentTurn >= 100 &&
      currentTurn < 175 &&
      topScore < 100
    ) {
      setTextOnDisplay("New Record. Bronze medal awarded!");
      playAudio(medal_mp3, isAudioOn, undefined, 250)
    } else if (
      currentTurn >= 175 &&
      currentTurn < 250 &&
      topScore < 175
    ) {
      setTextOnDisplay("New Record. Silver medal awarded!");
      playAudio(medal_mp3, isAudioOn, undefined, 250)
    } else if (currentTurn >= 250 && topScore < 250) {
      setTextOnDisplay("New Record. Gold medal awarded!");
      playAudio(medal_mp3, isAudioOn, undefined, 250)
    } else {
      setTextOnDisplay("New Record!");
      playAudio(topScore_mp3, isAudioOn, undefined, 250)
    }
  } else {
    // makeTopScore on death
    if(newGameOrDeath === "death") {
      // in TopDisplay logic to make display different text conditionally with smaller font
      setTextOnDisplay("No new record");
      playAudio(death_mp3, isAudioOn, undefined, 250)
      // makeTopScore on pressing new game
    } else {
      setTextOnDisplay("Deadly Tomb of Death - v1.0");
    }


  }
}

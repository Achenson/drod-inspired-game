export default function makeRecordScore(
  currentTurn: number,
  topScore: string | React.Dispatch<React.SetStateAction<string>>,
  setTopScore: string | React.Dispatch<React.SetStateAction<string>>,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>
) {
  if (currentTurn > parseInt(topScore as string)) {
    (setTopScore as React.Dispatch<React.SetStateAction<string>>)(
      (currentTurn + 1).toString()
    );
    // localStorage.setItem("record", (currentTurn + 1).toString());

    if (
      currentTurn >= 100 &&
      currentTurn < 175 &&
      parseInt(topScore as string) < 100
    ) {
      setTextOnDisplay("New Record. Bronze medal awarded!");
    } else if (
      currentTurn >= 175 &&
      currentTurn < 250 &&
      parseInt(topScore as string) < 175
    ) {
      setTextOnDisplay("New Record. Silver medal awarded!");
    } else if (currentTurn >= 250 && parseInt(topScore as string) < 250) {
      setTextOnDisplay("New Record. Gold medal awarded!");
    } else {
      setTextOnDisplay("New Record!");
    }
  } else {
    setTextOnDisplay("No new record. Rewind or try again!");
  }
}

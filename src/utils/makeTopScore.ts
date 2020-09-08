export default function makeRecordScore(
  currentTurn: number,
  topScore: string | React.Dispatch<React.SetStateAction<string>>,
  setTopScore: string| React.Dispatch<React.SetStateAction<string>>
) {

  if (currentTurn > parseInt(topScore as string)) {
    (setTopScore as React.Dispatch<React.SetStateAction<string>>)((currentTurn + 1).toString());
    // localStorage.setItem("record", (currentTurn + 1).toString());
  }


}

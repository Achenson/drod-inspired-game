export default function makeRecordScore(
  currentTurn: number,
  recordScore: string,
  setRecordScore: React.Dispatch<React.SetStateAction<string>>
) {
  if (currentTurn > parseInt(recordScore)) {
    setRecordScore((currentTurn + 1).toString());
    localStorage.setItem("record", (currentTurn + 1).toString());
  }
}

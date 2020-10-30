export default function makeBoard(x: number): number[][] {
  let boardArr: number[][] = [];

  for (let j = x - 1; j >= 0; j--) {
    for (let i = 0; i < x; i++) {
      let cordinateArr: number[] = [];
      cordinateArr.push(i);
      cordinateArr.push(j);

      boardArr.push(cordinateArr);
    }
  }

  return boardArr;
}

import { Directions } from "./interfaces";
import { HeroObj } from "./interfaces";

export default function handleKeysOrBtns(
  command: string,
  settingsVisibility: boolean,
  setSettingsVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  helpVisibility: boolean,
  setHelpVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  largeScreenRender: boolean,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>,
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>,
  setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,
  setLastEnemyKilled: React.Dispatch<React.SetStateAction<number | null>>,
  // one turn back
  oTB: {
    currentTurn: number;
    enemies: number[];
    enemiesDirections: number[];
    lastEnemyKilled: number | null;
    heroPosition: number;
    alive: boolean;
    swordPosition: number;
  },
  setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
  randomNewEnemyPosition: [boolean, number],
  setRandomNewEnemyPosition: React.Dispatch<
    React.SetStateAction<[boolean, number]>
  >,
  savedEnemiesDirections: [boolean, number[]],
  setSavedEnemiesDirections: React.Dispatch<
    React.SetStateAction<[boolean, number[]]>
  >,
  turnCourseWrapper: (directionToMove: Directions) => void,
  newGame: () => void
) {
  if (settingsVisibility) {
    setSettingsVisibility(false);
  }

  if (helpVisibility && !largeScreenRender) {
    setHelpVisibility(false);
  }

  switch (command) {
    // rewind one round back
    case "KeyR":
      console.log("KeyR");
      setTextOnDisplay("");
      setCurrentTurn(oTB.currentTurn);
      // setEnemiesKilled(oTB.enemiesKilled);
      setEnemies([...oTB.enemies]);
      setEnemiesDirections([...oTB.enemiesDirections]);
      setLastEnemyKilled(oTB.lastEnemyKilled);
      setHero({
        heroPosition: oTB.heroPosition,
        alive: oTB.alive,
        swordPosition: oTB.swordPosition,
      });
      setRandomNewEnemyPosition([true, randomNewEnemyPosition[1]]);
      setSavedEnemiesDirections([true, [...savedEnemiesDirections[1]]]);

      break;
    case "KeyQ":
      console.log("q");
      turnCourseWrapper(Directions.anticlockwise);
      break;
    case "KeyW":
      console.log("w");
      turnCourseWrapper(Directions.clockwise);
      break;
    case "Numpad7":
      console.log("numpad 7");
      turnCourseWrapper(Directions.nw);
      break;
    case "Numpad8":
      console.log("numpad 8");
      turnCourseWrapper(Directions.n);
      break;
    case "Numpad9":
      console.log("numpad 9");
      turnCourseWrapper(Directions.ne);
      break;
    case "Numpad4":
      console.log("numpad 4");
      turnCourseWrapper(Directions.w);
      break;
    case "Numpad5":
      console.log("numpad 5");
      turnCourseWrapper(Directions.wait);
      break;
    case "Numpad6":
      console.log("numpad 6");
      turnCourseWrapper(Directions.e);
      break;
    case "Numpad1":
      console.log("numpad 1");
      turnCourseWrapper(Directions.sw);
      break;
    case "Numpad2":
      console.log("numpad 2");
      turnCourseWrapper(Directions.s);
      break;
    case "Numpad3":
      console.log("numpad 3");
      turnCourseWrapper(Directions.se);
      break;
    case "KeyN":
      console.log("New Game");
      newGame();
      break;
  }
}

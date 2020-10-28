import React from "react";

import { useState, useEffect, useMemo } from "react";
import { ReactComponent as Settings } from "../svgs/cog-small.svg";

interface Props {
  boardWidth: number;
  largeScreenRender: boolean;
  helpVisibility: boolean;
}

function Help({
  boardWidth,
  largeScreenRender,
  helpVisibility,
}: Props): JSX.Element {
  let smallScreenSettings = useMemo(() => {
    return {
      width: `${boardWidth + 20}px`,
      marginBottom: ""
    };
  }, [boardWidth]);

  let largeScreenSettings = useMemo(() => {
    return {
      width: `${boardWidth + 144}px`,
      marginBottom: "2px"
    };
  }, [boardWidth]);

  const [screenSettings, setScreenSettings] = useState(
    (function initialScreenSettings() {
      return largeScreenRender ? largeScreenSettings : smallScreenSettings;
    })()
  );

  useEffect(() => {
    if (largeScreenRender) {
      setScreenSettings(largeScreenSettings);
    }

    if (!largeScreenRender) {
      setScreenSettings(smallScreenSettings);
    }
  }, [largeScreenRender, smallScreenSettings, largeScreenSettings]);

  return (
    <div
      className={`flex flex-col justify-center z-50 ${
        helpVisibility ? "visible" : "hidden"
      } ${largeScreenRender ? "" : "absolute"}`}
      style={{ marginBottom: "0.75rem" }}
    >
      <div
        className={`bg-gray-200 border-black border-2 rounded-md text-sm px-1 py-1 ${
          largeScreenRender ? "ml-1" : "-ml-2"
        } `}
        style={{
          width: `${screenSettings.width}`,
          marginBottom: `${screenSettings.marginBottom}`
          // width: `${boardWidth + 130}px`,
          // height: `${boardWidth + 100}px`,
        }}
      >
        <p className="mb-2">
          Deadly Tomb of Death is a puzzle roguelike game heavily inspired by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:no-underline"
          >
            Deadly Rooms of Death.
          </a>
        </p>
        <p className="mb-2">
          In BTOS death is inevitable - survive as long as you can and beat your
          personal best. Win medals - bronze/silver/gold (100/175/250 rounds
          survived).{" "}
        </p>
        <p className="mb-2">
          BTOS' gameplay is turn-based. First goes the Player's action - eight
          directional movement, rotation or waiting. Moving into corners is
          forbidden. Additionally, you can go back one turn - even after dying!
        </p>
        <p className="mb-2">
          The enemies movement follows immediatelly - enemies will roam randomly
          unless the Hero is in adjacent tile <i>after</i> Player's action.
          Then, after every second turn, new enemy arrives randomly at the edge
          of the board.
        </p>
        <p className="mb-2">
          On the desktop the game is meant to be played using keyboard.
          Controls: move - <b>Numpad 1-4</b> & <b>6-9</b>, rotate - <b>Q</b> &{" "}
          <b>W</b>, wait - <b>Numpad 5</b>, go back one turn - <b>R</b>, new
          game - <b>N</b>.
        </p>

        <div className="flex">
          <p className="mb-2">To check the settings, press the cog (</p>
          <Settings className={`h-4 mt-1`} />
          <p>) icon.</p>
        </div>

        <p className="text-xs text-center">
          SFX obtained from{" "}
          <a
            href="https://www.zapsplat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:no-underline"
          >
            https://www.zapsplat.com/
          </a>
        </p>
      </div>
    </div>
  );
}

export default Help;

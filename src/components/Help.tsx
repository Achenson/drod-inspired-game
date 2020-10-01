import React from "react";

interface Props {
  boardWidth: number;
}

function Help({ boardWidth }: Props): JSX.Element {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="bg-gray-200 border-black border-2 rounded-md my-2 text-sm px-1 py-1"
        style={{
          width: `${boardWidth + 130}px`,
          // height: `${boardWidth + 100}px`,
        }}
      >
        <p>
          Buggy Tomb of Seth is a puzzle roguelike game heavily inspired by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Deadly_Rooms_of_Death"
            target="_blank"
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
        <p>
          BTOS' gameplay is turn-based. First goes the Hero's action - eight
          directional movement, rotation or waiting. Moving into corners
          (black tiles) is forbidden. Additionally you can go back one turn - a proper strategy, even after dying!
        </p>
        <p className="mb-2">
          The enemies movement follows immediatelly - enemies will roam randomly
          unless the Hero is in adjacent tile <i>after</i> Hero's action.
          Then, after every second turn, new enemy arrives randomly at the edge
          of the board.
        </p>
        <p>
          On the desktop the game is meant to be played using a keyboard. Controls:
          move - <b>Numpad 1-4</b> & <b>6-9</b>, rotate - <b>Q</b> & <b>W</b>,
          wait - <b>Numpad 5</b>, go back one turn - <b>R</b>, new game -{" "}
          <b>N</b>. You can also enable control buttons inside settings (cog
          icon).
        </p>
      </div>
    </div>
  );
}

export default Help;

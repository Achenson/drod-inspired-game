import React from "react";
import { useState } from "react";
import { ReactComponent as Settings } from "../svgs/cog-small.svg";
import { ReactComponent as Help } from "../svgs/question-mark-round.svg";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
}

function UpperRightUI({ setTextOnDisplay }: Props): JSX.Element {
  const [animatePulse, setAnimatePulse] = useState<"animate-pulse" | null>(
    null
  );
  const [animateSpin, setAnimateSpin] = useState<"animate-spin" | null>(null);

  return (
    <div className="flex items-end my-1 ">
      <button>
        <Settings
          className={`h-6 mr-3 fill-current hover:text-purple-800 ${animateSpin}`}
          onMouseEnter={() => {
            setAnimateSpin("animate-spin");
            setTextOnDisplay("Settings");
          }}
          onMouseLeave={() => {
            setAnimateSpin(null);
            setTextOnDisplay("");
          }}
        />
      </button>
      <button>
        <Help
          className={`h-6 fill-current hover:text-purple-800 ${animatePulse}`}
          onMouseEnter={() => {
            setAnimatePulse("animate-pulse");
            setTextOnDisplay("Help");
          }}
          onMouseLeave={() => {
            setAnimatePulse(null);
            setTextOnDisplay("");
          }}
        />
      </button>
    </div>
  );
}

export default UpperRightUI;

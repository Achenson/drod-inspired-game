import React from "react";
import { useState } from "react";
import { ReactComponent as Settings } from "../svgs/cog-small.svg";
import { ReactComponent as Help } from "../svgs/question-mark-round.svg";

interface Props {}

function UpperRightUI({}: Props): JSX.Element {
  const [animatePulse, setAnimatePulse] = useState<"animate-pulse" | null>(null);
  const [animateSpin, setAnimateSpin] = useState<"animate-spin" | null>(null);

  return (
    <div className="flex items-center my-1 ">
      <button>
        <Settings className={`h-6 mr-3 fill-current hover:text-green-700 ${animateSpin}`} 
            onMouseEnter={() => setAnimateSpin("animate-spin")}
            onMouseLeave={() => setAnimateSpin(null)}
        />
      </button>
      <button>
        <Help
          className={`h-6 fill-current hover:text-green-700 ${animatePulse}`}
          onMouseEnter={() => setAnimatePulse("animate-pulse")}
          onMouseLeave={() => setAnimatePulse(null)}
        />
      </button>
    </div>
  );
}

export default UpperRightUI;

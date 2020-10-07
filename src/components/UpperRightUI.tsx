import React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as Settings } from "../svgs/cog-small.svg";
import { ReactComponent as Help } from "../svgs/question-mark-round.svg";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  helpClicked: string | React.Dispatch<React.SetStateAction<string>>;
  setHelpClicked: string | React.Dispatch<React.SetStateAction<string>>;
  settingsVisibility: boolean;
  setSettingsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  helpVisibility: boolean;
  setHelpVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  largeScreenRender: boolean;
}

function UpperRightUI({
  setTextOnDisplay,
  helpClicked,
  setHelpClicked,
  settingsVisibility,
  setSettingsVisibility,
  helpVisibility,
  setHelpVisibility,
  largeScreenRender,
}: Props): JSX.Element {
  const [animatePulse, setAnimatePulse] = useState<"animate-pulse" | null>(
    "animate-pulse"
  );

  useEffect(() => {
    if (helpClicked === "true") {
      setAnimatePulse(null);
    }
  }, [helpClicked]);

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
          onClick={() => {
            if (helpVisibility && !largeScreenRender) {
              setHelpVisibility(false);
            }

            setSettingsVisibility((b) => !b);
          }}
          onTouchStart={() => {
            setTextOnDisplay("Settings");
          }}
        />
      </button>
      <button>
        <Help
          className={`h-6 fill-current hover:text-purple-800 ${animatePulse}`}
          onClick={() => {
            (setHelpClicked as React.Dispatch<React.SetStateAction<string>>)(
              "true"
            );

            if (settingsVisibility && !largeScreenRender) {
              setSettingsVisibility(false);
            }

            setHelpVisibility((b) => !b);
          }}
          onMouseEnter={() => {
            setAnimatePulse("animate-pulse");
            setTextOnDisplay("Help & About");
          }}
          onMouseLeave={() => {
            // if (helpClicked === "true") {
            setAnimatePulse(null);
            // }

            setTextOnDisplay("");
          }}
          onTouchStart={() => {
            setTextOnDisplay("Help & About");
          }}
        />
      </button>
    </div>
  );
}

export default UpperRightUI;

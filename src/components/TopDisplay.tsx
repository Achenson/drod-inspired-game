import React from "react";

interface Props {
  boardWidth: number;
  textOnDisplay: string;
  largeScreenRender: boolean;
  // controlsVisibility: "responsive" | "alwaysOn" | "alwaysOff";
  controlsVisibility: string | React.Dispatch<React.SetStateAction<string>>;
}

function TopDisplay({
  boardWidth,
  textOnDisplay,
  largeScreenRender,
  controlsVisibility,
}: Props): JSX.Element {
  let smallText = "No new record. Rewind (R) or try again (N)!";

  function smallTextRender() {
    if (textOnDisplay === "No new record") {
      return true;
    } else {
      return false;
    }
  }

  function conditionalDisplay(textOnDisplay: string) {
    if (textOnDisplay !== "No new record") {
      return textOnDisplay;
    }

    // if rendering is for small screen & keyboard mode is not set
    if (!largeScreenRender && controlsVisibility !== "alwaysOff") {
      return "No new record. Rewind or try again!";
    }

    return "No new record. Rewind (R) or try again (N)!";
  }

  return (
    <div
      style={{ width: `${boardWidth}px` }}
      className="bg-black h-6 flex flex-col justify-center"
    >
      <p
        className={`text-white text-center ${
          smallTextRender() ? "text-sm" : "text-base"
        }`}
      >
        {conditionalDisplay(textOnDisplay)}
      </p>
    </div>
  );
}

export default TopDisplay;

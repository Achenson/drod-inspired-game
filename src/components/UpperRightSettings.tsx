import React, { useEffect, useState, Fragment } from "react";

import UpperRightSettingsChild from "./UpperRightSettings_child";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  largeScreenRender: boolean;
  controlsVisibility: number | React.Dispatch<React.SetStateAction<number>>;
  setControlsVisibility: number | React.Dispatch<React.SetStateAction<number>>;
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>;
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>;
  setIsAudioOn: number | React.Dispatch<React.SetStateAction<number>>;
}

function UpperRightSettings({
  setTextOnDisplay,
  largeScreenRender,
  controlsVisibility,
  setControlsVisibility,
  setTopScore,
  isAudioOn,
  setIsAudioOn,
}: Props): JSX.Element {
  
  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(true);
  const [cancelVisibility, setCancelVisibility] = useState<boolean>(false);

  const [keyboardHover, setKeyboardHover] = useState<"animate-pulse" | null>(
    null
  );

  const [keyboardClicked, setKeyboardClicked] = useState<boolean>(
    initialKeyboardClicked()
  );

  function initialKeyboardClicked() {
    switch (controlsVisibility) {
      case 1:
        return false;
      case 0:
        return true;
      default:
        return false;
    }
  }

  const [soundHover, setSoundHover] = useState<"animate-pulse" | null>(null);
  const [deleteHover, setDeleteHover] = useState<"animate-pulse" | null>(null);
  const [confirmHover, setConfirmHover] = useState<"animate-pulse" | null>(
    null
  );
  const [cancelHover, setCancelHover] = useState<"animate-pulse" | null>(null);

  useEffect(() => {
    if (keyboardClicked) {
      (setControlsVisibility as React.Dispatch<React.SetStateAction<number>>)(
        0
      );
      return;
    }

    if (!keyboardClicked) {
      (setControlsVisibility as React.Dispatch<React.SetStateAction<number>>)(
        1
      );
      return;
    }

  }, [keyboardClicked, setControlsVisibility]);

  function toggleIcons() {
    setConfirmVisibility(!confirmVisibility);
    setDeleteVisibility(!deleteVisibility);
    setCancelVisibility(!cancelVisibility);
  }

  return (
    <Fragment>
      <UpperRightSettingsChild
        setTextOnDisplay={setTextOnDisplay}
        soundHover={soundHover}
        setSoundHover={setSoundHover}
        keyboardHover={keyboardHover}
        setKeyboardHover={setKeyboardHover}
        keyboardClicked={keyboardClicked}
        setKeyboardClicked={setKeyboardClicked}
        cancelHover={cancelHover}
        cancelVisibility={cancelVisibility}
        confirmHover={confirmHover}
        deleteHover={deleteHover}
        deleteVisibility={deleteVisibility}
        setCancelHover={setCancelHover}
        setCancelVisibility={setCancelVisibility}
        setConfirmHover={setConfirmHover}
        setDeleteHover={setDeleteHover}
        setDeleteVisibility={setDeleteVisibility}
        toggleIcons={toggleIcons}
        setTopScore={setTopScore}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        largeScreenRender={largeScreenRender}
      />
    </Fragment>
  );
}

export default UpperRightSettings;

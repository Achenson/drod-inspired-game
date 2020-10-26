import React, { useEffect, useState, Fragment } from "react";


import UpperRightSettingsChild from "./UpperRightSettings_child";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  largeScreenRender: boolean;
  controlsVisibility:  string | React.Dispatch<React.SetStateAction<string>>;
  setControlsVisibility:  string | React.Dispatch<React.SetStateAction<string>>;
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>;
  isAudioOn:  number | React.Dispatch<React.SetStateAction<number>>;
  setIsAudioOn:   number | React.Dispatch<React.SetStateAction<number>>;
}


function UpperRightSettings({
  setTextOnDisplay,
  largeScreenRender,
  controlsVisibility,
  setControlsVisibility,
  setTopScore,
  isAudioOn,
  setIsAudioOn
}: Props): JSX.Element {
  // const [volumeColor, setVolumeColor] = useState("text-black")

  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(true);
  const [cancelVisibility, setCancelVisibility] = useState<boolean>(false);

  const [touchHover, setTouchHover] = useState<"animate-pulse" | null>(null);

  const [touchClicked, setTouchClicked] = useState<boolean>(initialTouchClicked());

  const [keyboardHover, setKeyboardHover] = useState<"animate-pulse" | null>(
    null
  );

  const [keyboardClicked, setKeyboardClicked] = useState<boolean>(initialKeyboardClicked());

  function initialTouchClicked() {
    
    switch(controlsVisibility) {
      case "responsive":
      return false;
      case "alwaysOn":
      return true;
      case "alwaysOff":
      return false;
      default:
      return false;
    }
  }

  function initialKeyboardClicked() {
    switch(controlsVisibility) {
      case "responsive":
      return false;
      case "alwaysOn":
      return false;
      case "alwaysOff":
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
    if (touchClicked) {
      (setControlsVisibility as React.Dispatch<React.SetStateAction<string>>)("alwaysOn");
      return;
    }

    if (keyboardClicked) {
      (setControlsVisibility as React.Dispatch<React.SetStateAction<string>>)("alwaysOff");
      return;
    }

    (setControlsVisibility as React.Dispatch<React.SetStateAction<string>>)("responsive");
  }, [touchClicked, keyboardClicked, setControlsVisibility]);

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
          touchHover={touchHover}
          setTouchHover={setTouchHover}
          keyboardHover={keyboardHover}
          setKeyboardHover={setKeyboardHover}
          touchClicked={touchClicked}
          setTouchClicked={setTouchClicked}
          keyboardClicked={keyboardClicked}
          setKeyboardClicked={setKeyboardClicked}
          cancelHover={cancelHover}
          cancelVisibility={cancelVisibility}
          confirmHover={confirmHover}
          confirmVisibility={confirmVisibility}
          deleteHover={deleteHover}
          deleteVisibility={deleteVisibility}
          setCancelHover={setCancelHover}
          setCancelVisibility={setCancelVisibility}
          setConfirmHover={setConfirmHover}
          setConfirmVisibility={setConfirmVisibility}
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

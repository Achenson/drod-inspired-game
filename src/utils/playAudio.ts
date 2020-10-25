export default function playAudio(
  audioVar: HTMLAudioElement,
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>,
  shouldPreviousAudioStop: boolean = false,
  delay: number = 0
) {
  if (isAudioOn) {
    if (shouldPreviousAudioStop) {
      audioVar.pause();
      //   the time position at which playback will begin once the play()  is called.
      audioVar.currentTime = 0;
    }

    if(!delay) {
      audioVar.play();
    } else {
      setTimeout( () => {
        audioVar.play()
      }, delay)
    }


  }
}
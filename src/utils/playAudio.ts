export default function playAudio(
  audioVar: HTMLAudioElement,
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>,
  shouldPreviousAudioStop: boolean = false
) {
  if (isAudioOn) {
    if (shouldPreviousAudioStop) {
      audioVar.pause();
      //   the time position at which playback will begin once the play()  is called.
      audioVar.currentTime = 0;
    }

    audioVar.play();
  }
}
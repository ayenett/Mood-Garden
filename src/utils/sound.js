import clickSoundMp3 from '../assets/joe_bou_khalil-micro-transient-balloon-burst-a-procedural-sound-design-562337.mp3';
import { triggerLightHaptic } from './haptics';

const clickAudio = new Audio(clickSoundMp3);
clickAudio.volume = 0.4;

let isClickSoundEnabled = true;

export const setClickSoundEnabled = (enabled) => {
  isClickSoundEnabled = enabled;
};

export const getClickSoundEnabled = () => isClickSoundEnabled;

export const playClickSound = () => {
  triggerLightHaptic();
  if (!isClickSoundEnabled) return;
  try {
    const sound = clickAudio.cloneNode();
    sound.volume = 0.4;
    sound.play().catch(() => {});
  } catch (e) {
    console.warn("Click sound error:", e);
  }
};


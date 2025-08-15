export const Sounds = {
  playSuccess: () => {
    const audio = new Audio("/sounds/success-sound.mp3");
    audio.volume = 1;
    audio.play().catch(() => {});
  },
  playError: () => {
    const audio = new Audio("/sounds/error-sound.mp3");
    audio.volume = 1;
    audio.play().catch(() => {});
  },
};

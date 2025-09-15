export const Sounds = {
  playSuccess: () => {
    const audio = new Audio("/sounds/success-sound.mp3");
    audio.play().catch(() => {});
  },
  playError: () => {
    const audio = new Audio("/sounds/error-sound.mp3");
    audio.play().catch(() => {});
  },
};

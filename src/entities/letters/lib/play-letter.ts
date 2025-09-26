import type { LetterType } from "@/entities/letters";
import { letterFileMap } from "./letter-file-map";

export const playLetter = (letter: LetterType) => {
  const audio = new Audio(`/sounds/letters/${letterFileMap[letter]}.mp3`);
  audio.play().catch(() => {});
};

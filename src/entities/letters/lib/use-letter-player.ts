import { useCallback } from "react";

import { usePlayer } from "@/shared/lib/hooks/use-player";

import { letterFileMap } from "../lib/letter-file-map";
import type { LetterType } from "../model/types";

export const useLetterPlayer = () => {
  const { play, stop } = usePlayer();

  const playLetter = (letter: LetterType) => {
    play(`/sounds/letters/learn-letter/${letterFileMap[letter]}.mp3`);
  };

  const playRequestLetter = useCallback(
    (letter: LetterType) => {
      play(`/sounds/letters/find-letter/${letterFileMap[letter]}.mp3`);
    },
    [play],
  );

  return { playLetter, playRequestLetter, stopLetter: stop };
};

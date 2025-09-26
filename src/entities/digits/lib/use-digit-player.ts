import { usePlayer } from "@/shared/lib/hooks/use-player";

import type { DigitType } from "../model/types";

export const useDigitPlayer = () => {
  const { play, stop } = usePlayer();

  const playDigit = (digit: DigitType) => {
    play(`/sounds/digits/learn-digit/${digit}.mp3`);
  };

  const playRequestDigit = (digit: DigitType) => {
    play(`/sounds/digits/find-digit/${digit}.mp3`);
  };

  return { playDigit, playRequestDigit, stopDigit: stop };
};

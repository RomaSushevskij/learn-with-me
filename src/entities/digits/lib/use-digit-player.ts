import { useCallback } from "react";

import { usePlayer } from "@/shared/lib/hooks/use-player";

import type { DigitType } from "../model/types";

export const useDigitPlayer = () => {
  const { play, stop } = usePlayer();

  const playDigit = (digit: DigitType) => {
    play(`/sounds/digits/learn-digit/${digit}.mp3`);
  };

  const playRequestDigit = useCallback(
    (digit: DigitType) => {
      play(`/sounds/digits/find-digit/${digit}.mp3`);
    },
    [play],
  );

  return { playDigit, playRequestDigit, stopDigit: stop };
};

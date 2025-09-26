import { useMemo, useState } from "react";

import { shuffleArray } from "@/shared/lib/shuffle-array";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";

import { LetterCard } from "../../letter-card";
import type { VowelLetterType } from "../../../model/types";
import { VOWELS_LETTERS } from "../../../model/constants";
import s from "./vowel-letters-grid.module.scss";

const generateVowelLetters = () => {
  return shuffleArray<VowelLetterType>(VOWELS_LETTERS);
};

export const VowelLettersGrid = ({
  onCardClick,
  selectedLetter,
}: {
  onCardClick?: (digit: VowelLetterType) => void;
  selectedLetter?: VowelLetterType;
}) => {
  const [digits] = useState<VowelLetterType[]>(generateVowelLetters);

  const rotations = useMemo(() => digits.map(() => getRandomRotation()), [digits]);

  const cardElements = digits.map((digit, index) => (
    <LetterCard
      key={digit}
      letter={digit}
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      onClick={() => onCardClick?.(digit)}
      className={selectedLetter === digit ? s.card_highlight : ""}
    />
  ));

  return <div className={s.root}>{cardElements}</div>;
};

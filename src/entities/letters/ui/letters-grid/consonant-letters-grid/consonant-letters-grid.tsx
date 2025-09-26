import { useMemo, useState } from "react";

import { shuffleArray } from "@/shared/lib/shuffle-array";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";

import { LetterCard } from "../../letter-card";
import type { ConsonantsLetterType } from "../../../model/types";
import { CONSONANTS_LETTERS } from "../../../model/constants";
import s from "./consonant-letters-grid.module.scss";

const generateVowelLetters = () => {
  return shuffleArray<ConsonantsLetterType>(CONSONANTS_LETTERS);
};

export const ConsonantLettersGrid = ({
  onCardClick,
  selectedLetter,
}: {
  onCardClick?: (digit: ConsonantsLetterType) => void;
  selectedLetter?: ConsonantsLetterType;
}) => {
  const [digits] = useState<ConsonantsLetterType[]>(generateVowelLetters);

  const rotations = useMemo(() => digits.map(() => getRandomRotation()), [digits]);

  const cardElements = digits.map((digit, index) => (
    <LetterCard
      key={digit}
      letter={digit}
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      onClick={() => onCardClick?.(digit)}
      className={selectedLetter === digit ? s.card_highlight : s.card}
    />
  ));

  return <div className={s.root}>{cardElements}</div>;
};

import { useMemo, useState } from "react";
import clsx from "clsx";

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
  className,
}: {
  onCardClick?: (digit: ConsonantsLetterType) => void;
  selectedLetter?: ConsonantsLetterType;
  className?: string;
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

  return <div className={clsx(s.root, className)}>{cardElements}</div>;
};

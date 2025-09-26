import { useMemo, useState } from "react";

import { shuffleArray } from "@/shared/lib/shuffle-array";
import type { DigitType } from "@/entities/digits";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";

import { DigitCard } from "./../digit-card";
import s from "./digits-grid.module.scss";

const generateDigits = () => {
  return shuffleArray<DigitType>(Array.from({ length: 10 }, (_, i) => (i + 1) as DigitType));
};

export const DigitsGrid = ({
  onCardClick,
  selectedDigit,
}: {
  onCardClick?: (digit: DigitType) => void;
  selectedDigit?: DigitType;
}) => {
  const [digits] = useState<DigitType[]>(generateDigits);

  const rotations = useMemo(() => digits.map(() => getRandomRotation()), [digits]);

  const cardElements = digits.map((digit, index) => (
    <DigitCard
      key={digit}
      digit={digit}
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      onClick={() => onCardClick?.(digit)}
      className={selectedDigit === digit ? s.card_highlight : ""}
    />
  ));

  return <div className={s.root}>{cardElements}</div>;
};

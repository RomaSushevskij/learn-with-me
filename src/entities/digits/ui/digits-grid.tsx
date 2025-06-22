import { useMemo } from "react";

import { shuffleArray } from "@/shared/lib/shuffle-array";

import { DigitCard } from "./digit-card";
import type { DigitType } from "@/entities/digits";

const digits = shuffleArray<DigitType>(Array.from({ length: 10 }, (_, i) => (i + 1) as DigitType));

function getRandomRotation() {
  return Math.floor(Math.random() * 15) - 5;
}

export const DigitsGrid = ({ onCardClick }: { onCardClick?: (digit: DigitType) => void }) => {
  const rotations = useMemo(() => digits.map(() => getRandomRotation()), []);

  const cardElements = digits.map((digit, index) => (
    <DigitCard
      key={digit}
      digit={digit}
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      onClick={() => onCardClick?.(digit)}
    />
  ));

  return (
    <div
      className="grid gap-6 sm:gap-10
      [grid-template-columns:repeat(auto-fit,minmax(6.25rem,1fr))]
      [grid-template-rows:max-content]"
    >
      {cardElements}
    </div>
  );
};

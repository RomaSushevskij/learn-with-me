import { useMemo, useState } from "react";

import { shuffleArray } from "@/shared/lib/shuffle-array";
import type { DigitType } from "@/entities/digits";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";

import { DigitCard } from "./digit-card";

const generateDigits = () => {
  return shuffleArray<DigitType>(Array.from({ length: 10 }, (_, i) => (i + 1) as DigitType));
};

export const DigitsGrid = ({
  onCardClick,
  selectedDigit,
  selectedDigitCardClassName,
}: {
  onCardClick?: (digit: DigitType) => void;
  selectedDigit?: DigitType;
  selectedDigitCardClassName?: string;
}) => {
  const [digits] = useState<DigitType[]>(generateDigits);

  const rotations = useMemo(() => digits.map(() => getRandomRotation()), [digits]);

  const cardElements = digits.map((digit, index) => (
    <DigitCard
      key={digit}
      digit={digit}
      style={{ transform: `rotate(${rotations[index]}deg)` }}
      onClick={() => onCardClick?.(digit)}
      className={selectedDigit === digit ? selectedDigitCardClassName : ""}
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

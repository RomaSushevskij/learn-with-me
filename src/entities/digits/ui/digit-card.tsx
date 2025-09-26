import React, { type DetailedHTMLProps, type HTMLAttributes } from "react";

import { UiCard } from "@/shared/ui/ui-card/ui-card";

import { digitColors } from "../lib/digit-colors";
import type { DigitType } from "../model/types";

type DigitCardProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onClick"
> & {
  digit: DigitType;
  onClick?: (digit: DigitType) => void;
};

export const DigitCard: React.FC<DigitCardProps> = ({ digit, onClick, ...props }) => {
  const color = digitColors[digit];

  const handleClick = (value: string | number) => {
    onClick?.(value as DigitType);
  };

  return <UiCard value={digit} color={color} onClick={handleClick} {...props} />;
};

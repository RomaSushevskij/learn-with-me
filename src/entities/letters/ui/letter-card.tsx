import React, { type DetailedHTMLProps, type HTMLAttributes } from "react";

import { UiCard } from "@/shared/ui/ui-card/ui-card";

import { letterColors } from "../lib/letter-colors";
import type { LetterType } from "../model/types";

type LetterCardProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onClick"
> & {
  letter: LetterType;
  onClick?: (digit: LetterType) => void;
};

export const LetterCard: React.FC<LetterCardProps> = ({ letter, onClick, ...props }) => {
  const color = letterColors[letter];

  const handleClick = (value: string | number) => {
    onClick?.(value as LetterType);
  };

  return <UiCard value={letter} color={color} onClick={handleClick} {...props} />;
};

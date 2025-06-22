import React, { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { digitColors } from "../lib/digit-colors";

import { UiCard } from "@/shared/ui/ui-card/ui-card";
import type { DigitType } from "@/entities/digits";

type DigitCardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  digit: DigitType;
};

export const DigitCard: React.FC<DigitCardProps> = ({ digit, ...props }) => {
  const color = digitColors[digit];

  return <UiCard value={digit} color={color} {...props} />;
};

import { useState } from "react";

import { DigitsGrid, type DigitType } from "@/entities/digits";
import { GoHomeButton } from "@/features/go-home-button";
import { useSpeechSynthesis } from "@/shared/lib/hooks/use-speech-synthesis";

import s from "./learn-digits-page.module.scss";

type TSelectedDigit = {
  value: DigitType | undefined;
  className: string;
};

const initSelectedDigit: TSelectedDigit = { value: undefined, className: "" };

export const LearnDigitsPage = () => {
  const { speak } = useSpeechSynthesis();
  const [selectedDigit, setSelectedDigit] = useState<{
    value: DigitType | undefined;
    className: string;
  }>(() => initSelectedDigit);

  const handleDigitCardClick = (digit: DigitType) => {
    speak(`${digit}`);
    setSelectedDigit({ value: digit, className: s.digit_card_highlight });
    setTimeout(() => {
      setSelectedDigit(initSelectedDigit);
    }, 300);
  };

  return (
    <div>
      <div className="mb-10 max-w-max">
        <GoHomeButton />
      </div>

      <DigitsGrid
        selectedDigit={selectedDigit.value}
        selectedDigitCardClassName={selectedDigit.className}
        onCardClick={handleDigitCardClick}
      />
    </div>
  );
};

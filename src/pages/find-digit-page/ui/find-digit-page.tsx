import React, { useRef, useState } from "react";

import { DigitsGrid, type DigitType } from "@/entities/digits";
import { UiSpeechButton } from "@/shared/ui/ui-speech-button/ui-speech-button";
import { getRandomDigit } from "@/entities/digits/lib/get-random-digit";
import { GoHomeButton } from "@/features/go-home-button";
import { speakText } from "@/shared/lib/speak-text";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";

import { FirstStepContent } from "./first-step-content";

export const FindDigitPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [targetDigit, setTargetDigit] = useState<DigitType>(() => getRandomDigit());
  const speechButtonRef = useRef<HTMLButtonElement | null>(null);

  const dialogs = useDialogs();

  const requestDigit = async (digit: number) => {
    speakText(`Покажи цифру ${digit}`);
  };

  const handleSpeechButtonFirstStepClick = () => {
    setStep(2);
    requestDigit(targetDigit);
  };

  const handleDigitCardClick = (digit: DigitType) => {
    const isSuccess = digit === targetDigit;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = () => {
        const newTargetDigit = getRandomDigit();
        setTargetDigit(newTargetDigit);
        requestDigit(newTargetDigit);
      };

      const audio = new Audio("/sounds/success-sound.mp3");
      audio.volume = 1;
      audio.play();

      const dialogId = dialogs.openDialog({
        component: (
          <UiSuccessDialog
            onOkClick={() => {
              dialogs.closeDialog(dialogId);
              handleCloseDialogAfterSuccess();
            }}
          />
        ),
        showCloseButton: false,
        dialogClassName: "bg-lime-200",
        persistent: true,
      });
    } else {
      const audio = new Audio("/sounds/error-sound.mp3");
      audio.volume = 1;
      audio.play();

      const dialogId = dialogs.openDialog({
        component: (
          <UiErrorDialog
            onOkClick={() => {
              dialogs.closeDialog(dialogId);
              requestDigit(targetDigit);
            }}
          />
        ),
        showCloseButton: false,
        dialogClassName: "bg-red-200",
        persistent: true,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-4 justify-between items-center mb-4 sm:mb-10 sm:mx-10">
        <GoHomeButton />

        {step === 2 && (
          <UiSpeechButton ref={speechButtonRef} onClick={() => requestDigit(targetDigit)} />
        )}
      </div>

      {step === 1 && (
        <FirstStepContent>
          <UiSpeechButton
            width={"7rem"}
            height={"7rem"}
            ref={speechButtonRef}
            onClick={handleSpeechButtonFirstStepClick}
          />
        </FirstStepContent>
      )}
      {step === 2 && <DigitsGrid onCardClick={handleDigitCardClick} />}
    </div>
  );
};

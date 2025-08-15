import React, { useEffect, useRef, useState } from "react";

import { DigitsGrid, type DigitType, getRandomDigit } from "@/entities/digits";
import { GoHomeButton } from "@/features/go-home-button";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { delay } from "@/shared/lib/delay";
import { UiButton } from "@/shared/ui/ui-button";
import { SpeakerIcon } from "@/shared/ui/icons/speaker-icon";
import { useSpeechSynthesis } from "@/shared/lib/hooks/use-speech-synthesis";
import { Sounds } from "@/shared/lib/Sounds";

export const FindDigitPage: React.FC = () => {
  const [targetDigit, setTargetDigit] = useState<DigitType>(() => getRandomDigit());
  const [cardsGridKey, setCardsGridKey] = useState(Math.random());
  const { speak } = useSpeechSynthesis();

  const dialogs = useDialogs();

  const requestDigit = async (digit: number) => {
    speak(`Покажи цифру ${digit}`);
  };

  const handleDigitCardClick = (digit: DigitType) => {
    const isSuccess = digit === targetDigit;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        const newTargetDigit = getRandomDigit();
        setTargetDigit(newTargetDigit);
        requestDigit(newTargetDigit);
        setCardsGridKey(Math.random());
      };

      Sounds.playSuccess();

      const dialogId = dialogs.openDialog({
        component: <UiSuccessDialog onOkClick={() => handleCloseDialogAfterSuccess(dialogId)} />,
        showCloseButton: false,
        dialogClassName: "bg-lime-200",
        persistent: true,
      });
    } else {
      const handleCloseDialogAfterError = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        requestDigit(targetDigit);
        setCardsGridKey(Math.random());
      };

      Sounds.playError();

      const dialogId = dialogs.openDialog({
        component: <UiErrorDialog onOkClick={() => handleCloseDialogAfterError(dialogId)} />,
        showCloseButton: false,
        dialogClassName: "bg-red-200",
        persistent: true,
      });
    }
  };
  const speakerButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    delay(300).then(() => {
      if (speakerButtonRef.current !== null) {
        speakerButtonRef.current.click();
      }
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-4 justify-between items-center mb-4 mb-10 sm:mx-10">
        <GoHomeButton />
        <UiButton withIcon ref={speakerButtonRef} onClick={() => requestDigit(targetDigit)}>
          <SpeakerIcon />
        </UiButton>
      </div>
      <DigitsGrid key={cardsGridKey} onCardClick={handleDigitCardClick} />
    </div>
  );
};

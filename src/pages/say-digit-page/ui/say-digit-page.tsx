import { UiFlexColumn, UiFlexRow } from "@/shared/ui/ui-flex";
import { GoHomeButton } from "@/features/go-home-button";
import { useState } from "react";
import { DigitCard, type DigitType, getRandomDigit, normalizeDigit } from "@/entities/digits";

import { useSpeechRecognition } from "@/shared/lib/hooks/use-speech-recognition";
import { UiMicrophoneButton } from "@/shared/ui/ui-microphone-button";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { Sounds } from "@/shared/lib/Sounds";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";

import s from "./say-digit-page.module.scss";

export const SayDigitPage = () => {
  const [targetDigit, setTargetDigit] = useState<{ value: DigitType; rotation: number }>(() => ({
    value: getRandomDigit(),
    rotation: getRandomRotation(),
  }));

  const dialogs = useDialogs();

  const handleSpeechResult = (voiceText: string) => {
    const normalizedDigit = normalizeDigit(voiceText);
    const isSuccess = normalizedDigit === targetDigit.value;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        const newTargetDigit = {
          value: getRandomDigit(),
          rotation: getRandomRotation(),
        };
        setTargetDigit(newTargetDigit);
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

  const { startListening, isListening, stopListening } = useSpeechRecognition({
    onResult: handleSpeechResult,
  });

  const handleMicrophoneButton = () => {
    if (isListening) {
      stopListening();

      return;
    }

    startListening();
  };
  return (
    <UiFlexColumn className={s.root}>
      <UiFlexRow>
        <div className="mb-10 max-w-max">
          <GoHomeButton />
        </div>
      </UiFlexRow>
      <UiFlexColumn justify={"space-evenly"} align={"center"} className={s.main}>
        <DigitCard
          className={s.digit_card}
          digit={targetDigit.value}
          style={{ transform: `rotate(${targetDigit.rotation}deg)` }}
        />
        <UiMicrophoneButton isActive={isListening} onClick={handleMicrophoneButton} />
      </UiFlexColumn>
    </UiFlexColumn>
  );
};

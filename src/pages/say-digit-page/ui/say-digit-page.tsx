import { useCallback, useState } from "react";

import { UiFlexColumn, UiFlexRow } from "@/shared/ui/ui-flex";
import { GoHomeButton } from "@/features/go-home-button";
import { DigitCard, type DigitType, getRandomDigit, normalizeDigit } from "@/entities/digits";
import { UiMicrophoneButton } from "@/shared/ui/ui-microphone-button";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { Sounds } from "@/shared/lib/Sounds";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { type TVoskResultHandler, useVoskRu } from "@/shared/lib/hooks/use-vosk-ru";

import s from "./say-digit-page.module.scss";
import { MODEL_PATH } from "../constants/model-path";

export const SayDigitPage = () => {
  const [targetDigit, setTargetDigit] = useState<{ value: DigitType; rotation: number }>(() => ({
    value: getRandomDigit(),
    rotation: getRandomRotation(),
  }));

  const dialogs = useDialogs();

  const handleSpeechResult = useCallback<TVoskResultHandler>(
    ({ text, setUtterance }) => {
      const normalizedDigit = normalizeDigit(text);
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
        setUtterance(null);
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
    },
    [targetDigit, dialogs],
  );

  const { connectToRecognizer, disconnectFromRecognizer, utterance, isListening } = useVoskRu({
    modelPath: MODEL_PATH,
    onResult: handleSpeechResult,
  });

  const handleMicrophoneButtonClick = () => {
    if (isListening) {
      disconnectFromRecognizer();

      return;
    }

    connectToRecognizer();
  };

  return (
    <UiFlexColumn className={s.root}>
      <UiFlexRow>
        <div className="mb-10 max-w-max">
          <GoHomeButton />
        </div>
      </UiFlexRow>
      <UiFlexColumn marginTop={"20"} align={"center"} className={s.main}>
        <DigitCard
          className={s.digit_card}
          digit={targetDigit.value}
          style={{ transform: `rotate(${targetDigit.rotation}deg)` }}
        />
        <div className="mt-24">
          <UiMicrophoneButton isActive={isListening} onClick={handleMicrophoneButtonClick} />
        </div>
        {utterance && (
          <div className="mt-16 px-4 py-2 bg-red-100 border border-red-300 rounded-lg text-red-800 text-center flex gap-4 items-center justify-center gap-2">
            <span className="text-xl">❌</span>
            <span>Вы сказали: «{utterance.text}»</span>
          </div>
        )}
      </UiFlexColumn>
    </UiFlexColumn>
  );
};

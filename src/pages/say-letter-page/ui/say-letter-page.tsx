import { useCallback, useState } from "react";

import { UiFlexColumn, UiFlexRow } from "@/shared/ui/ui-flex";
import { GoBackButton } from "@/features/go-back-button";
import { UiMicrophoneButton } from "@/shared/ui/ui-microphone-button";
import { getRandomRotation } from "@/shared/lib/get-random-rotation";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { Sounds } from "@/shared/lib/Sounds";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { type TVoskResultHandler, useVoskRu } from "@/shared/lib/hooks/use-vosk-ru";
import { UiPageLoader } from "@/shared/ui/ui-page-loader";
import {
  getRandomLetter,
  LetterCard,
  LettersPageContainer,
  type LetterType,
  normalizeLetter,
  useLetterCategory,
} from "@/entities/letters";
import { GoHomeButton } from "@/features/go-home-button";

import s from "./say-letter-page.module.scss";
import { MODEL_PATH } from "../constants/model-path";

export const SayLetterPage = () => {
  const { letterCategory } = useLetterCategory();

  const [targetLetter, setTargetLetter] = useState<{ value: LetterType; rotation: number }>(() => ({
    value: getRandomLetter(letterCategory),
    rotation: getRandomRotation(),
  }));

  const dialogs = useDialogs();

  const handleSpeechResult = useCallback<TVoskResultHandler>(
    ({ text, setUtterance }) => {
      const normalizedLetter = normalizeLetter(text, targetLetter.value);
      console.log({ text, normalizedLetter });
      const isSuccess = normalizedLetter === targetLetter.value;

      if (isSuccess) {
        const handleCloseDialogAfterSuccess = (dialogId: string) => {
          dialogs.closeDialog(dialogId);
          const newTargetLetter = {
            value: getRandomLetter(letterCategory),
            rotation: getRandomRotation(),
          };
          setTargetLetter(newTargetLetter);
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
    [targetLetter, dialogs],
  );

  const {
    connectToRecognizer,
    disconnectFromRecognizer,
    utterance,
    isListening,
    isModelInitialized,
  } = useVoskRu({
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

  const pageContent = (
    <UiFlexColumn marginTop={"20"} align={"center"} className={s.main}>
      <LetterCard
        className={s.digit_card}
        letter={targetLetter.value}
        style={{ transform: `rotate(${targetLetter.rotation}deg)` }}
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
  );

  return (
    <LettersPageContainer className={s.root}>
      <UiFlexRow>
        <div className="flex gap-4 mb-10 max-w-max">
          <GoBackButton />
          <GoHomeButton />
        </div>
      </UiFlexRow>

      {isModelInitialized ? pageContent : <UiPageLoader className="mt-10" />}
    </LettersPageContainer>
  );
};

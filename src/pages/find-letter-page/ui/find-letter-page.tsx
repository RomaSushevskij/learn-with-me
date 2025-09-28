import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import {
  getRandomLetter,
  LettersGrid,
  LettersPageContainer,
  type LetterType,
  useLetterCategory,
  useLetterPlayer,
} from "@/entities/letters";
import { GoBackButton } from "@/features/go-back-button";
import { UiButton } from "@/shared/ui/ui-button";
import { SpeakerIcon } from "@/shared/ui/icons/speaker-icon";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { Sounds } from "@/shared/lib/Sounds";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { GoHomeButton } from "@/features/go-home-button";
import { UiFindCardTutorialDialog } from "@/shared/ui/ui-find-card-tutorial-dialog";

export const FindLetterPage = () => {
  const { letterCategory } = useLetterCategory();

  const [targetLetter, setTargetLetter] = useState<LetterType>(() =>
    getRandomLetter(letterCategory),
  );
  const [cardsGridKey, setCardsGridKey] = useState(Math.random());
  const speakerButtonRef = useRef<HTMLButtonElement | null>(null);

  const { playRequestLetter } = useLetterPlayer();
  const dialogs = useDialogs();

  const requestLetter = useCallback(
    async (letter: LetterType) => {
      playRequestLetter(letter);
    },
    [playRequestLetter],
  );

  const handleLetterCardClick = (letter: LetterType) => {
    const isSuccess = letter === targetLetter;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        let newTargetLetter = targetLetter;
        while (targetLetter === newTargetLetter) {
          newTargetLetter = getRandomLetter(letterCategory);
        }
        setTargetLetter(newTargetLetter);
        requestLetter(newTargetLetter);
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
        requestLetter(targetLetter);
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

  useEffect(() => {
    setTimeout(() => {
      const handleCloseTutorialDialog = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        requestLetter(targetLetter);
      };
      const dialogId = dialogs.openDialog({
        component: (
          <UiFindCardTutorialDialog
            message={"Найди нужную букву и нажми на неё"}
            onBtnClick={() => handleCloseTutorialDialog(dialogId)}
          />
        ),
        showCloseButton: false,
        persistent: true,
      });
    }, 0);
  }, []);

  return (
    <LettersPageContainer className="flex flex-col">
      <div className={clsx("flex gap-x-4 items-center mb-4")}>
        <GoBackButton />
        <GoHomeButton />
        <UiButton
          className="!ml-auto"
          withIcon
          ref={speakerButtonRef}
          onClick={() => requestLetter(targetLetter)}
        >
          <SpeakerIcon />
        </UiButton>
      </div>
      <LettersGrid key={cardsGridKey} onCardClick={handleLetterCardClick} />
    </LettersPageContainer>
  );
};

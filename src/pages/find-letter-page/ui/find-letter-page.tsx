import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import {
  LettersGrid,
  LettersPageContainer,
  type LetterType,
  useLetterPlayer,
  useLettersGenerator,
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
import { useNavigate } from "react-router-dom";
import { routePath } from "@/shared/config/route-config";
import { UiAwardDialog } from "@/shared/ui/ui-award-dialog";
import { UiProgress } from "@/shared/ui/ui-progress";

export const FindLetterPage = () => {
  const navigate = useNavigate();
  const { targetItem, updateTargetItem, removeItem, addRandomItems, progress } =
    useLettersGenerator();
  const { playRequestLetter } = useLetterPlayer();
  const dialogs = useDialogs();

  const [cardsGridKey, setCardsGridKey] = useState(Math.random());

  const requestLetter = useCallback(
    async (letter: LetterType | null) => {
      if (letter === null) {
        return;
      }
      playRequestLetter(letter);
    },
    [playRequestLetter],
  );

  const handleCompleted = () => {
    const handleCloseDialog = async (dialogId: string) => {
      dialogs.closeDialog(dialogId);
      navigate(routePath.letters, { replace: true });
    };
    Sounds.playComplete();
    const dialogId = dialogs.openDialog({
      component: <UiAwardDialog onOkClick={() => handleCloseDialog(dialogId)} />,
      showCloseButton: false,
      persistent: true,
      dialogClassName: "bg-amber-100",
    });
  };

  const handleLetterCardClick = (letter: LetterType) => {
    const isSuccess = letter === targetItem;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        const remainingItems = removeItem(targetItem);
        const newTargetItem = updateTargetItem(remainingItems);

        if (newTargetItem === null) {
          handleCompleted();

          return;
        }

        requestLetter(newTargetItem);
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

        if (targetItem === null) {
          return;
        }
        addRandomItems();
        requestLetter(targetItem);
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

        if (targetItem === null) {
          return;
        }

        requestLetter(targetItem);
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
        <UiButton className="!ml-auto" withIcon onClick={() => requestLetter(targetItem)}>
          <SpeakerIcon />
        </UiButton>
      </div>
      <UiProgress progress={progress} />
      <LettersGrid key={cardsGridKey} onCardClick={handleLetterCardClick} />
    </LettersPageContainer>
  );
};

import { useCallback, useEffect, useState } from "react";

import {
  DigitsGrid,
  DigitsPageContainer,
  type DigitType,
  useDigitPlayer,
  useDigitsGenerator,
} from "@/entities/digits";
import { GoBackButton } from "@/features/go-back-button";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { UiButton } from "@/shared/ui/ui-button";
import { SpeakerIcon } from "@/shared/ui/icons/speaker-icon";
import { Sounds } from "@/shared/lib/Sounds";
import { GoHomeButton } from "@/features/go-home-button";
import { UiProgress } from "@/shared/ui/ui-progress";
import { UiAwardDialog } from "@/shared/ui/ui-award-dialog";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/shared/config/route-config";
import { UiFindCardTutorialDialog } from "@/shared/ui/ui-find-card-tutorial-dialog";

export const FindDigitPage = () => {
  const navigate = useNavigate();
  const { targetItem, updateTargetItem, removeItem, addRandomItems, progress } =
    useDigitsGenerator();
  const [cardsGridKey, setCardsGridKey] = useState(Math.random());
  const { playRequestDigit } = useDigitPlayer();
  const dialogs = useDialogs();

  const requestDigit = useCallback(
    async (digit: DigitType | null) => {
      if (digit === null) {
        return;
      }

      playRequestDigit(digit);
    },
    [playRequestDigit],
  );

  const handleCompleted = () => {
    const handleCloseDialog = async (dialogId: string) => {
      dialogs.closeDialog(dialogId);
      navigate(routePath.digits);
    };
    Sounds.playComplete();
    const dialogId = dialogs.openDialog({
      component: <UiAwardDialog onOkClick={() => handleCloseDialog(dialogId)} />,
      showCloseButton: false,
      persistent: true,
      dialogClassName: "bg-amber-100",
    });
  };

  const handleDigitCardClick = (digit: DigitType) => {
    const isSuccess = digit === targetItem;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = async (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        const remainingItems = removeItem(targetItem);
        const newTargetItem = updateTargetItem(remainingItems);

        if (newTargetItem === null) {
          handleCompleted();

          return;
        }

        requestDigit(newTargetItem);
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
        requestDigit(targetItem);
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

        requestDigit(targetItem);
      };
      const dialogId = dialogs.openDialog({
        component: (
          <UiFindCardTutorialDialog
            message={"Найди нужную цифру и нажми на неё"}
            onBtnClick={() => handleCloseTutorialDialog(dialogId)}
          />
        ),
        showCloseButton: false,
        persistent: true,
      });
    }, 0);
  }, []);

  return (
    <DigitsPageContainer className="flex flex-col">
      <div className="flex gap-x-4 items-center mb-4">
        <GoBackButton />
        <GoHomeButton />
        <UiButton withIcon onClick={() => requestDigit(targetItem)} className="!ml-auto">
          <SpeakerIcon />
        </UiButton>
      </div>
      <UiProgress progress={progress} />
      <DigitsGrid key={cardsGridKey} onCardClick={handleDigitCardClick} />
    </DigitsPageContainer>
  );
};

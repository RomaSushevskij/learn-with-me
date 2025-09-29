import { useCallback, useState } from "react";

import {
  DigitsGrid,
  DigitsPageContainer,
  type DigitType,
  getRandomDigit,
  useDigitPlayer,
} from "@/entities/digits";
import { GoBackButton } from "@/features/go-back-button";
import { useDialogs } from "@/shared/ui/ui-dialog";
import { UiSuccessDialog } from "@/shared/ui/ui-success-dialog";
import { UiErrorDialog } from "@/shared/ui/ui-error-dialog";
import { UiButton } from "@/shared/ui/ui-button";
import { SpeakerIcon } from "@/shared/ui/icons/speaker-icon";
import { Sounds } from "@/shared/lib/Sounds";
import { GoHomeButton } from "@/features/go-home-button";

export const FindDigitPage = () => {
  const [targetDigit, setTargetDigit] = useState<DigitType>(() => getRandomDigit());
  const [cardsGridKey, setCardsGridKey] = useState(Math.random());

  const { playRequestDigit } = useDigitPlayer();
  const dialogs = useDialogs();

  const requestDigit = useCallback(
    async (digit: DigitType) => {
      playRequestDigit(digit);
    },
    [playRequestDigit],
  );

  const handleDigitCardClick = (digit: DigitType) => {
    const isSuccess = digit === targetDigit;

    if (isSuccess) {
      const handleCloseDialogAfterSuccess = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        let newTargetDigit = targetDigit;
        while (newTargetDigit === targetDigit) {
          newTargetDigit = getRandomDigit();
        }
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

  useEffect(() => {
    setTimeout(() => {
      const handleCloseTutorialDialog = (dialogId: string) => {
        dialogs.closeDialog(dialogId);
        requestDigit(targetDigit);
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
        <UiButton withIcon onClick={() => requestDigit(targetDigit)} className="!ml-auto">
          <SpeakerIcon />
        </UiButton>
      </div>
      <DigitsGrid key={cardsGridKey} onCardClick={handleDigitCardClick} />
    </DigitsPageContainer>
  );
};

import {
  DigitCard,
  DigitsGrid,
  DigitsPageContainer,
  type DigitType,
  useDigitPlayer,
} from "@/entities/digits";
import { GoBackButton } from "@/features/go-back-button";
import { useDialogs } from "@/shared/ui/ui-dialog";
import s from "./learn-digits-page.module.scss";
import { GoHomeButton } from "@/features/go-home-button";

export const LearnDigitsPage = () => {
  const { openDialog } = useDialogs();
  const { playDigit, stopDigit } = useDigitPlayer();

  const handleDigitCardClick = async (digit: DigitType) => {
    openDialog({
      component: <DigitCard digit={digit} className={s.digit_card} />,
      showCloseButton: false,
      dialogClassName: s.dialog,
      onClose: stopDigit,
    });

    playDigit(digit);
  };
  return (
    <DigitsPageContainer>
      <div className="mb-4 max-w-max flex gap-4">
        <GoBackButton />
        <GoHomeButton />
      </div>

      <DigitsGrid onCardClick={handleDigitCardClick} />
    </DigitsPageContainer>
  );
};

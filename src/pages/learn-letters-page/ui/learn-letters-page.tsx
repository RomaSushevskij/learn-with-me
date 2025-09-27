import clsx from "clsx";

import { useDialogs } from "@/shared/ui/ui-dialog";
import {
  LetterCard,
  LettersGrid,
  LettersPageContainer,
  type LetterType,
  useLetterPlayer,
} from "@/entities/letters";
import { GoBackButton } from "@/features/go-back-button";

import { GoHomeButton } from "@/features/go-home-button";
import s from "./learn-letters-page.module.scss";

export const LearnLettersPage = () => {
  const { openDialog } = useDialogs();
  const { playLetter, stopLetter } = useLetterPlayer();

  const handleLetterCardClick = async (letter: LetterType) => {
    openDialog({
      component: <LetterCard letter={letter} className={s.letter_card} />,
      showCloseButton: false,
      dialogClassName: s.dialog,
      onClose: stopLetter,
    });

    playLetter(letter);
  };

  return (
    <LettersPageContainer>
      <div className={clsx("flex gap-4 mb-4")}>
        <GoBackButton />
        <GoHomeButton />
      </div>
      <LettersGrid onCardClick={handleLetterCardClick} />
    </LettersPageContainer>
  );
};

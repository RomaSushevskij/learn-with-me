import { VowelLettersGrid } from "./vowel-letters-grid/vowel-letters-grid";
import { ConsonantLettersGrid } from "./consonant-letters-grid/consonant-letters-grid";
import {
  type ConsonantsLetterType,
  type LetterType,
  type VowelLetterType,
} from "../../model/types";
import { useLetterCategory } from "../../lib/use-letter-category";

export const LettersGrid = ({
  onCardClick,
  selectedLetter,
  className,
}: {
  onCardClick?: (letter: LetterType) => void;
  selectedLetter?: LetterType;
  className?: string;
}) => {
  const { letterCategory } = useLetterCategory();

  if (letterCategory === "vowel") {
    return (
      <VowelLettersGrid
        selectedLetter={selectedLetter as VowelLetterType}
        onCardClick={onCardClick}
        className={className}
      />
    );
  }

  return (
    <ConsonantLettersGrid
      selectedLetter={selectedLetter as ConsonantsLetterType}
      onCardClick={onCardClick}
      className={className}
    />
  );
};

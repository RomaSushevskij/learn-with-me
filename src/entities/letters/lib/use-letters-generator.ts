import { useItemsGenerator } from "@/shared/lib/use-items-generator";
import { CONSONANTS_LETTERS, VOWELS_LETTERS } from "../model/constants";
import type { ConsonantsLetterType, VowelLetterType } from "../model/types";
import { useLetterCategory } from "@/entities/letters";

export const useLettersGenerator = () => {
  const { letterCategory } = useLetterCategory();

  return useItemsGenerator(
    letterCategory === "consonant"
      ? (CONSONANTS_LETTERS as unknown as ConsonantsLetterType[])
      : (VOWELS_LETTERS as unknown as VowelLetterType[]),
  );
};

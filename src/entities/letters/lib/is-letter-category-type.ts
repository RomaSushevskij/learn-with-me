import type { LetterCategory } from "../model/types";

const letterCategories: LetterCategory[] = ["vowel", "consonant"];

export const isLetterCategoryType = (value: unknown): value is LetterCategory => {
  return letterCategories.some((letterCategory) => value === letterCategory);
};

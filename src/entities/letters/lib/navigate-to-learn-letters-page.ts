import { routePath } from "@/shared/config/route-config";
import type { LetterCategory } from "@/entities/letters";

export const navigateToLearnLettersPage = (letterCategory: LetterCategory) => {
  return `${routePath.learnLetters}?category=${letterCategory}`;
};

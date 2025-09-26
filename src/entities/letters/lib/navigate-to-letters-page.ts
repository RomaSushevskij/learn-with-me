import type { LetterCategory } from "@/entities/letters";

export const navigateToLettersPage = (path: string, letterCategory: LetterCategory) => {
  return `${path}?category=${letterCategory}`;
};

import type { LetterCategory, LetterType } from "../model/types";
import { VOWELS_LETTERS, CONSONANTS_LETTERS, ALL_LETTERS } from "../model/constants";

export const getRandomLetter = (filter?: LetterCategory): LetterType => {
  let pool: readonly LetterType[];

  if (filter === "vowel") {
    pool = VOWELS_LETTERS;
  } else if (filter === "consonant") {
    pool = CONSONANTS_LETTERS;
  } else {
    pool = ALL_LETTERS;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

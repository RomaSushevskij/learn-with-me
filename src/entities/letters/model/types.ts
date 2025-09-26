import type { ALL_LETTERS, VOWELS_LETTERS, CONSONANTS_LETTERS } from "./constants";

export type VowelLetterType = (typeof VOWELS_LETTERS)[number];
export type ConsonantsLetterType = (typeof CONSONANTS_LETTERS)[number];
export type LetterType = (typeof ALL_LETTERS)[number];
export type LetterCategory = "vowel" | "consonant";

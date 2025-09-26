export const VOWELS_LETTERS = ["А", "Е", "Ё", "И", "О", "У", "Ы", "Э", "Ю", "Я"] as const;

export const CONSONANTS_LETTERS = [
  "Б",
  "В",
  "Г",
  "Д",
  "Ж",
  "З",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "П",
  "Р",
  "С",
  "Т",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ь",
] as const;

export const ALL_LETTERS = [...VOWELS_LETTERS, ...CONSONANTS_LETTERS] as const;

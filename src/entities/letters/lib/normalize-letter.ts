// entities/letters/lib/letter-map.ts
import type { LetterType } from "../model/types";

export const letterMap: Record<string, string> = {
  // Гласные
  а: "А",
  о: "О",
  у: "У",
  ы: "Ы",
  э: "Э",
  я: "Я",
  ё: "Ё",
  ю: "Ю",
  и: "И",
  е: "Е",

  // Согласные (названия)
  бэ: "Б",
  бы: "Б",
  ба: "Б",
  вэ: "В",
  вы: "В",
  ва: "В",
  гэ: "Г",
  гы: "Г",
  дэ: "Д",
  ды: "Д",
  же: "Ж",
  жэ: "Ж",
  жа: "Ж",
  зэ: "З",
  ка: "К",
  кэ: "К",
  эл: "Л",
  эм: "М",
  эмма: "М",
  эн: "Н",
  пэ: "П",
  эр: "Р",
  эс: "С",
  тэ: "Т",
  фэ: "Ф",
  ха: "Х",
  цэ: "Ц",
  це: "Ц",
  че: "Ч",
  ша: "Ш",
  ща: "Щ",
  мы: "М",

  // Особые случаи / фразы
  й: "Й",
  "и краткая": "Й",
  "и кратко": "Й",
  ъ: "Ъ",
  "твердый знак": "Ъ",
  "твёрдый знак": "Ъ",
  ь: "Ь",
  "мягкий знак": "Ь",
};

const ALL_KEYS = Object.keys(letterMap);
const PHRASE_KEYS = ALL_KEYS.filter((k) => k.includes(" ")).sort((a, b) => b.length - a.length);

function tokenizeRussianWords(s: string): string[] {
  return s.split(/[^а-яё]+/g).filter(Boolean);
}

export const normalizeLetter = (input: string, targetLetter: LetterType): string | null => {
  if (!input) return null;

  const trimmed = input.trim().toLowerCase();

  // 0) одиночная буква целиком
  if (/^[а-яё]$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  // 1) точное совпадение (например "и краткая")
  if (Object.prototype.hasOwnProperty.call(letterMap, trimmed)) {
    return letterMap[trimmed];
  }

  // 2) ищем фразовые ключи (например "твёрдый знак")
  for (const key of PHRASE_KEYS) {
    if (trimmed.includes(key)) {
      return letterMap[key];
    }
  }

  // 3) ищем по токенам
  const tokens = tokenizeRussianWords(trimmed);

  for (const token of tokens) {
    // если токен — одиночная буква
    if (/^[а-яё]$/.test(token)) {
      return token.toUpperCase();
    }
    // если токен совпадает с ключом карты
    if (letterMap[token]) {
      return letterMap[token];
    }
  }

  if (input.toLowerCase().includes(targetLetter.toLowerCase())) {
    return targetLetter;
  }

  return null;
};

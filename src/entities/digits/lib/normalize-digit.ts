import { digitMap } from "@/entities/digits/lib/digit-map";

export function normalizeDigit(input: string): number | null {
  const trimmed = input.trim().toLowerCase();

  // 1) Если просто число
  if (/^\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10);
  }

  // 2) Если слово
  if (Object.prototype.hasOwnProperty.call(digitMap, trimmed)) {
    return digitMap[trimmed];
  }

  // 3) Если встречается в фразе (например "это было два" или "цифра пять")
  for (const [word, num] of Object.entries(digitMap)) {
    if (trimmed.includes(word)) {
      return num;
    }
  }

  return null;
}

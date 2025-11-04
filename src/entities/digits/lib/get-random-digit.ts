import { DIGITS } from "@/entities/digits";

export const getRandomDigit = () => {
  const randomIndex = Math.floor(Math.random() * DIGITS.length);

  return DIGITS[randomIndex];
};

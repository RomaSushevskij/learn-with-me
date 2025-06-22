import type { DigitType } from "../model/types";

export const getRandomDigit = () => {
  return (Math.floor(Math.random() * 10) + 1) as DigitType;
};

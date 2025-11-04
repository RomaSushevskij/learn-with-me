import { useItemsGenerator } from "@/shared/lib/use-items-generator";
import { DIGITS } from "../model/constants";

export const useDigitsGenerator = () => {
  return useItemsGenerator(DIGITS);
};

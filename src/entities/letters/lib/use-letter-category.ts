import { useLayoutEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { isLetterCategoryType } from "./is-letter-category-type";

import { routePath } from "@/shared/config/route-config";
import type { LetterCategory } from "@/entities/letters";

export const useLetterCategory = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isLetterCategoryType(searchParams.get("category"))) {
      navigate(routePath.lettersCategory);
    }
  }, [searchParams, navigate]);

  return { letterCategory: searchParams.get("category") as LetterCategory };
};

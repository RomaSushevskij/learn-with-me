import type { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/main-page";
import { LearnDigitsPage } from "@/pages/learn-digits-page/ui/learn-digits-page";
import { FindDigitPage } from "@/pages/find-digit-page";
import { SayDigitPage } from "@/pages/say-digit-page";
import { DigitsPage } from "@/pages/digits-page";
import { LettersPage } from "@/pages/letters-page";
import { LettersCategoryPage } from "@/pages/letters-category-page";
import { LearnLettersPage } from "@/pages/learn-letters-page";
import { FindLetterPage } from "@/pages/find-letter-page";
import { SayLetterPage } from "@/pages/say-letter-page";

enum AppRoutes {
  MAIN = "main",
  DIGITS = "digits",
  LEARN_DIGITS = "learnDigits",
  FIND_DIGIT = "findDigit",
  SAY_DIGIT = "sayDigit",
  LETTERS = "letters",
  LETTERS_CATEGORY = "lettersCategory",
  LEARN_LETTERS = "learnLetters",
  FIND_LETTER = "findLetter",
  SAY_LETTER = "sayLetter",
  NOT_FOUND = "notFound",
}

type TRoutePath = Record<AppRoutes, string> & {
  getPath: <T extends Record<string, string | number>>(
    route: AppRoutes,
    params?: T | undefined,
  ) => string;
};

export const routePath: TRoutePath = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.DIGITS]: "/digits",
  [AppRoutes.LEARN_DIGITS]: "/learn-digits",
  [AppRoutes.FIND_DIGIT]: "/find-digit",
  [AppRoutes.SAY_DIGIT]: "/say-digit",
  [AppRoutes.LETTERS]: "/letters",
  [AppRoutes.LETTERS_CATEGORY]: "/letters-category",
  [AppRoutes.LEARN_LETTERS]: "/learn-letters",
  [AppRoutes.FIND_LETTER]: "/find-letter",
  [AppRoutes.SAY_LETTER]: "/say-letter",
  [AppRoutes.NOT_FOUND]: "*",

  getPath: (route, params) => {
    return routePath[route].replace(/:([a-zA-Z]+)/g, (_, key) => String(params ? params[key] : ""));
  },
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: routePath.main,
    element: <MainPage />,
  },
  [AppRoutes.LEARN_DIGITS]: {
    path: routePath.learnDigits,
    element: <LearnDigitsPage />,
  },
  [AppRoutes.DIGITS]: {
    path: routePath.digits,
    element: <DigitsPage />,
  },
  [AppRoutes.FIND_DIGIT]: {
    path: routePath.findDigit,
    element: <FindDigitPage />,
  },
  [AppRoutes.SAY_DIGIT]: {
    path: routePath.sayDigit,
    element: <SayDigitPage />,
  },
  [AppRoutes.LETTERS]: {
    path: routePath.letters,
    element: <LettersPage />,
  },
  [AppRoutes.LETTERS_CATEGORY]: {
    path: routePath.lettersCategory,
    element: <LettersCategoryPage />,
  },
  [AppRoutes.LEARN_LETTERS]: {
    path: routePath.learnLetters,
    element: <LearnLettersPage />,
  },
  [AppRoutes.FIND_LETTER]: {
    path: routePath.findLetter,
    element: <FindLetterPage />,
  },
  [AppRoutes.SAY_LETTER]: {
    path: routePath.sayLetter,
    element: <SayLetterPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePath.notFound,
    element: <div>Nof found page</div>,
  },
};

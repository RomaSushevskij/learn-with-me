import type { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/main-page";
import { LearnDigitsPage } from "@/pages/learn-digits-page/ui/learn-digits-page";
import { FindDigitPage } from "@/pages/find-digit-page";

enum AppRoutes {
  MAIN = "main",
  LEARN_DIGITS = "learnDigits",
  FIND_DIGIT = "findDigit",
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
  [AppRoutes.LEARN_DIGITS]: "/learn-digits",
  [AppRoutes.FIND_DIGIT]: "/find-digit",
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
  [AppRoutes.FIND_DIGIT]: {
    path: routePath.findDigit,
    element: <FindDigitPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePath.notFound,
    element: <div>Nof found page</div>,
  },
};

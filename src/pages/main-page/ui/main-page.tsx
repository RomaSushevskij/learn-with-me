import { UiButton } from "@/shared/ui/ui-button";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/shared/config/route-config";

import s from "./main-page.module.scss";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-4 h-dvh items-center">
      <div className={s.logo} />
      <div className={s.menu}>
        <UiButton onClick={() => navigate(routePath.learnDigits)}>Учить цифры</UiButton>
        <UiButton onClick={() => navigate(routePath.findDigit)}>Найди цифру</UiButton>
        <UiButton onClick={() => navigate(routePath.sayDigit)}>Назови цифру</UiButton>
      </div>
    </div>
  );
};

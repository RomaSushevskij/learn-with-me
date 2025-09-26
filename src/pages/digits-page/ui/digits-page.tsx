import { useNavigate } from "react-router-dom";

import { NavigationLayout } from "@/widgets/navigation-layout";
import { UiButton } from "@/shared/ui/ui-button";
import { routePath } from "@/shared/config/route-config";

import s from "./digits-page.module.scss";

export const DigitsPage = () => {
  const navigate = useNavigate();

  return (
    <NavigationLayout showGoBackButton className={s.container}>
      <div className={s.menu}>
        <UiButton onClick={() => navigate(routePath.learnDigits)}>Учить цифры</UiButton>
        <UiButton onClick={() => navigate(routePath.findDigit)}>Найди цифру</UiButton>
        <UiButton onClick={() => navigate(routePath.sayDigit)}>Назови цифру</UiButton>
      </div>
    </NavigationLayout>
  );
};

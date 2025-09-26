import { useNavigate } from "react-router-dom";

import { NavigationLayout } from "@/widgets/navigation-layout";
import { UiButton } from "@/shared/ui/ui-button";
import { routePath } from "@/shared/config/route-config";

import s from "./letters-page.module.scss";

export const LettersPage = () => {
  const navigate = useNavigate();

  const handleLearnClick =
    ({ targetPath, pageTitle }: { targetPath: string; pageTitle: string }) =>
    () => {
      // редирект на выбор категории с указанием target
      navigate(routePath.lettersCategory, { state: { targetPath, pageTitle } });
    };

  return (
    <NavigationLayout showGoBackButton>
      <div className={s.menu}>
        <UiButton
          onClick={handleLearnClick({
            targetPath: routePath.learnLetters,
            pageTitle: "Учить буквы",
          })}
        >
          Учить буквы
        </UiButton>
        <UiButton
          onClick={handleLearnClick({ targetPath: routePath.findLetter, pageTitle: "Найди букву" })}
        >
          Найди букву
        </UiButton>
        <UiButton
          onClick={handleLearnClick({
            targetPath: routePath.sayLetter,
            pageTitle: "Назови букву",
          })}
        >
          Назови букву
        </UiButton>
      </div>
    </NavigationLayout>
  );
};

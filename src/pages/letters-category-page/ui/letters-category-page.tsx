import { useLocation } from "react-router-dom";

import { UiFlex } from "@/shared/ui/ui-flex/ui-flex";
import { UiNavTile } from "@/shared/ui/ui-nav-tile";
import VowelLettersIcon from "/public/images/vowel-letters.png";
import ConsonantLettersIcon from "/public/images/consonant-letters.png";
import { NavigationLayout } from "@/widgets/navigation-layout";
import { navigateToLettersPage } from "@/entities/letters";

import s from "./letters-category-page.module.scss";

export const LettersCategoryPage = () => {
  const location = useLocation();

  // куда редиректить после выбора категории
  const targetPath = location.state?.targetPath || "/";
  const pageTitle = location.state?.pageTitle;

  return (
    <NavigationLayout showGoBackButton showGoHomeButton className={s.container}>
      <UiFlex justify={"center"} className="w-full grow-1">
        <section className="flex flex-col w-full self-center max-w-80 grow-1">
          <h1 className="text-center mb-10 text-3xl">{pageTitle}</h1>
          <UiFlex columnGap={"30"} justify={"space-around"}>
            <UiNavTile
              label={"Гласные буквы"}
              icon={VowelLettersIcon}
              to={navigateToLettersPage(targetPath, "vowel")}
              className={s.nav_tile}
            />
            <UiNavTile
              label={"Согласные буквы"}
              icon={ConsonantLettersIcon}
              to={navigateToLettersPage(targetPath, "consonant")}
              className={s.nav_tile}
            />
          </UiFlex>
        </section>
      </UiFlex>
    </NavigationLayout>
  );
};

import { NavigationLayout } from "@/widgets/navigation-layout";
import { routePath } from "@/shared/config/route-config";
import DigitsIcon from "/public/images/digits.png";
import LettersIcon from "/public/images/letters.png";
import { UiFlex } from "@/shared/ui/ui-flex/ui-flex";
import { UiNavTile } from "@/shared/ui/ui-nav-tile";

export const MainPage = () => {
  return (
    <NavigationLayout>
      <UiFlex justify={"center"} className="w-full grow-1">
        <UiFlex columnGap={"30"} justify={"space-around"} className="w-full self-center max-w-80">
          <UiNavTile label={"Цифры"} icon={DigitsIcon} to={routePath.digits} />
          <UiNavTile label={"Буквы"} icon={LettersIcon} to={routePath.letters} />
        </UiFlex>
      </UiFlex>
    </NavigationLayout>
  );
};

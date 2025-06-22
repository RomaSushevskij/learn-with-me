import { UiButton } from "@/shared/ui/ui-button";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/shared/config/route-config";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-4">
      <UiButton onClick={() => navigate(routePath.learnDigits)}>Учить цифры</UiButton>
      <UiButton onClick={() => navigate(routePath.findDigit)}>Найди цифру</UiButton>
    </div>
  );
};

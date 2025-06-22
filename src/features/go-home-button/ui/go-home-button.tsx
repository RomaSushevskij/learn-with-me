import { useNavigate } from "react-router-dom";

import { UiButton } from "@/shared/ui/ui-button";
import { routePath } from "@/shared/config/route-config";

export const GoHomeButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <UiButton className={className} onClick={() => navigate(routePath.main)}>
      На главную
    </UiButton>
  );
};

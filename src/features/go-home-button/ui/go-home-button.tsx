import { useNavigate } from "react-router-dom";

import { UiButton } from "@/shared/ui/ui-button";
import { routePath } from "@/shared/config/route-config";
import { BackArrowIcon } from "@/shared/ui/icons/back-arrow-icon";

export const GoHomeButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <UiButton withIcon className={className} onClick={() => navigate(routePath.main)}>
      <BackArrowIcon />
    </UiButton>
  );
};

import { useNavigate } from "react-router-dom";

import { UiButton } from "@/shared/ui/ui-button";
import { HomeIcon } from "@/shared/ui/icons/home-icon";

import clsx from "clsx";

import s from "./go-home-button.module.scss";
import { routePath } from "@/shared/config/route-config";

export const GoHomeButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routePath.main);
  };

  return (
    <UiButton withIcon className={clsx(s.root, className)} onClick={handleClick}>
      <HomeIcon />
    </UiButton>
  );
};

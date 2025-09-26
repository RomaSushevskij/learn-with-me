import { type To, useNavigate } from "react-router-dom";

import { UiButton } from "@/shared/ui/ui-button";
import { BackArrowIcon } from "@/shared/ui/icons/back-arrow-icon";
import clsx from "clsx";

import s from "./go-back-button.module.scss";

export const GoBackButton = ({ className, to }: { className?: string; to?: To }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to !== undefined) {
      navigate(to);

      return;
    }

    navigate(-1);
  };

  return (
    <UiButton withIcon className={clsx(s.root, className)} onClick={handleClick}>
      <BackArrowIcon />
    </UiButton>
  );
};

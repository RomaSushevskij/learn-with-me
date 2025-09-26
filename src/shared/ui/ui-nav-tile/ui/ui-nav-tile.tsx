import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { UiFlex } from "@/shared/ui/ui-flex/ui-flex";
import { UiButton } from "@/shared/ui/ui-button";

import s from "./ui-nav-tile.module.scss";

export const UiNavTile = ({
  to,
  icon,
  label,
  className,
}: {
  to: string;
  icon: string;
  label: string;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <UiFlex direction="column" align="center" className={clsx(s.root, className)}>
      <UiButton onClick={() => navigate(to)} className={s.icon_button}>
        <img src={icon} alt={label} />
      </UiButton>
      <p className="mt-2 text-slate-800 text-xl font-medium text-center">{label}</p>
    </UiFlex>
  );
};

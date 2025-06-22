import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

import s from "./ui-button.module.scss";

export const UiButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(className, s.root)} {...props}>
      {children}
    </button>
  );
};

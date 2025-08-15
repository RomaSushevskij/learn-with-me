import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

import s from "./ui-button.module.scss";

export const UiButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    withIcon?: boolean;
  }
> = ({ children, className, withIcon = false, ...props }) => {
  return (
    <button className={clsx(className, s.root, { [s.with_icon]: withIcon })} {...props}>
      {children}
    </button>
  );
};

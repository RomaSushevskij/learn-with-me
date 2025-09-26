import type { ReactNode } from "react";
import clsx from "clsx";

import s from "./digits-page-container.module.scss";

export const DigitsPageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={clsx(s.root, className)}>{children}</div>;
};

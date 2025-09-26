import type { ReactNode } from "react";
import clsx from "clsx";

import { useLetterCategory } from "../../lib/use-letter-category";

import s from "./letters-page-container.module.scss";

export const LettersPageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { letterCategory } = useLetterCategory();

  return <div className={clsx(s.root, className, s[letterCategory])}>{children}</div>;
};

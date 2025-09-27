import type { ReactNode } from "react";
import clsx from "clsx";

import { GoBackButton } from "@/features/go-back-button";
import { GoHomeButton } from "@/features/go-home-button";

import s from "./navigation-layout.module.scss";

export const NavigationLayout = ({
  children,
  showGoBackButton,
  showGoHomeButton,
  className,
}: {
  children: ReactNode;
  showGoBackButton?: boolean;
  showGoHomeButton?: boolean;
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col gap-y-4 h-dvh items-center relative", className)}>
      <div className={s.logo} />
      {showGoBackButton && <GoBackButton className={s.go_back_button} />}
      {showGoHomeButton && <GoHomeButton className={s.go_home_button} />}
      {children}
    </div>
  );
};

import type { ReactNode } from "react";
import { GoBackButton } from "@/features/go-back-button";

import s from "./navigation-layout.module.scss";
import { GoHomeButton } from "@/features/go-home-button";

export const NavigationLayout = ({
  children,
  showGoBackButton,
  showGoHomeButton,
}: {
  children: ReactNode;
  showGoBackButton?: boolean;
  showGoHomeButton?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-y-4 h-dvh items-center">
      <div className={s.logo} />
      {showGoBackButton && <GoBackButton className={s.go_back_button} />}
      {showGoHomeButton && <GoHomeButton className={s.go_home_button} />}
      {children}
    </div>
  );
};

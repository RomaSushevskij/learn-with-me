import { type PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routePath } from "@/shared/config/route-config";
import s from "./app-layout.module.scss";
import clsx from "clsx";
import { UiFlex } from "@/shared/ui/ui-flex/ui-flex";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  const isMainPage = pathname === routePath.main;

  useEffect(() => {
    new Image().src = "/images/success-image.jpg";
    new Image().src = "/images/error-image.jpg";
  }, []);

  const padding = "30";

  return (
    <UiFlex
      direction={"column"}
      paddingBottom={padding}
      paddingTop={padding}
      paddingX={padding}
      className={clsx(s.root, { [s.main_page]: !isMainPage })}
    >
      {children}
    </UiFlex>
  );
};

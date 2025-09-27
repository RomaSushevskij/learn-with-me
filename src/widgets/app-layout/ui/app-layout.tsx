import { type PropsWithChildren, useEffect } from "react";
import clsx from "clsx";

import s from "./app-layout.module.scss";

export const AppLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    new Image().src = "/images/success-image.jpg";
    new Image().src = "/images/error-image.jpg";
  }, []);

  return <section className={clsx(s.root)}>{children}</section>;
};

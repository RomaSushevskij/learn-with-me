import { type ReactNode } from "react";
import { createPortal } from "react-dom";

export const UiPortal = ({
  children,
  container,
}: {
  children: ReactNode;
  container: Element | DocumentFragment | null;
}) => {
  return createPortal(children, container ?? document.body);
};

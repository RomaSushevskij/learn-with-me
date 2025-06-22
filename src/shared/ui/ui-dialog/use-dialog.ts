import { useRef } from "react";

import type { TDialogMethods } from "./ui-dialog/ui-dialog";

export const useDialog = () => {
  const ref = useRef<TDialogMethods | null>(null);

  const open = () => {
    ref?.current?.openDialog();
  };

  const close = () => {
    ref?.current?.closeDialog();
  };

  return {
    ref,
    open,
    close,
  };
};

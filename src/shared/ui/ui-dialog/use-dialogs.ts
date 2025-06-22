import { createContext, type ReactElement, useContext } from "react";

export type TDialogsContext = {
  openDialog: (data: {
    component: ReactElement;
    persistent?: boolean;
    header?: ReactElement;
    showCloseButton?: boolean;
    onClose?: () => void;
    dialogClassName?: string;
  }) => string;
  closeDialog: (id: string) => void;
  confirm: (data: {
    message: string;
    header?: ReactElement;
    ok?: ReactElement<{ onClick?: () => void }>;
    cancel?: ReactElement<{ onClick?: () => void }>;
    persistent?: boolean;
    onClose?: () => void;
  }) => Promise<boolean>;
};

export const DialogsContext = createContext<TDialogsContext | null>(null);

export const useDialogs = () => {
  const ctx = useContext(DialogsContext);

  if (!ctx) throw new Error("useDialogs must be used inside DialogsProvider");

  return ctx;
};

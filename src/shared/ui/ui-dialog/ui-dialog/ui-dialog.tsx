import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefCallback,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { UiButton } from "@/shared/ui/ui-button";
import { UiPortal } from "@/shared/ui/ui-portal";

import { DIALOG_CONTAINER_ID } from "../dialogs-provider";
import s from "./ui-dialog.module.scss";
import clsx from "clsx";

export type TDialogMethods = {
  openDialog: (data?: { component: ReactElement; persistent?: boolean }) => void;
  closeDialog: () => void;
};

export type TDialogRef = RefCallback<TDialogMethods> | RefObject<TDialogMethods>;

export const UiDialog = ({
  children,
  initialState = false,
  header,
  ref,
  dialogContainerId,
  isTopMost = true,
  persistent = false,
  onClose,
  showCloseButton = true,
  dialogClassName,
}: {
  children: ReactNode;
  initialState?: boolean;
  header?: ReactNode;
  ref: TDialogRef;
  dialogContainerId?: string;
  isTopMost?: boolean;
  persistent?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  dialogClassName?: string;
}) => {
  const [open, setOpen] = useState(initialState);
  const dialogContainer = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  useImperativeHandle(ref, () => ({ openDialog, closeDialog }));

  useEffect(() => {
    dialogContainer.current = document.getElementById(dialogContainerId ?? DIALOG_CONTAINER_ID);
  }, [dialogContainerId]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (open && dialog) {
      dialog.classList.remove(s["enter-active"]);
      void dialog.offsetHeight;
      dialog.classList.add(s["enter-active"]);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (persistent) return;
      if (!isTopMost) return;
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTopMost, persistent, closeDialog]);

  if (!open) return null;

  const handleDialogClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleOverlayClick = () => {
    if (persistent) return;

    closeDialog();
  };

  return (
    <UiPortal container={dialogContainer.current}>
      <div
        className="fixed inset-0 flex items-center
        justify-center px-16 py-8 bg-black/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div
          className={clsx(
            `p-6
        rounded-2xl
        shadow-2xl
        transition-transform transition-opacity duration-300 ease`,
            dialogClassName ? dialogClassName : "bg-purple-200",
            s.dialog,
          )}
          ref={dialogRef}
          onClick={handleDialogClick}
        >
          <div className={s.header}>
            {header}
            {showCloseButton && (
              <UiButton className={s.close_btn} onClick={closeDialog}>
                <div>X</div>
              </UiButton>
            )}
          </div>

          <div className={s.content}>{children}</div>
        </div>
      </div>
    </UiPortal>
  );
};

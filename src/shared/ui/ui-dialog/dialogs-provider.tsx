import { cloneElement, type PropsWithChildren, type ReactElement, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { nanoid } from "nanoid";

import { type TDialogMethods, UiDialog } from "@/shared/ui/ui-dialog/ui-dialog/ui-dialog";

import { DialogsContext, type TDialogsContext } from "./use-dialogs";
import { ConfirmDialog } from "./confirm-dialog/confirm-dialog";

export const DIALOG_CONTAINER_ID = "dialogContainer";

type TDialogEntity = Parameters<TDialogsContext["openDialog"]>[number] & {
  id: string;
};

export const DialogsProvider = ({
  children,
  containerId = DIALOG_CONTAINER_ID,
}: PropsWithChildren & { containerId?: string }) => {
  const dialogsRef = useRef<Map<string, TDialogMethods | null>>(new Map());
  const [dialogs, setDialogs] = useState<TDialogEntity[]>([]);

  const addDialog = (data: Parameters<TDialogsContext["openDialog"]>[number]) => {
    const id = nanoid();
    setDialogs((prevDialogs) => [
      ...prevDialogs,
      {
        id,
        ...data,
      },
    ]);

    return id;
  };

  const openDialog = (data: Parameters<TDialogsContext["openDialog"]>[number]) => {
    const id = flushSync(() => {
      return addDialog(data);
    });

    dialogsRef.current.get(id)?.openDialog();

    return id;
  };

  const closeDialog = (id: string) => {
    dialogsRef.current.get(id)?.closeDialog();

    setDialogs((prevDialogs) => prevDialogs.filter((dialog) => dialog.id !== id));
  };

  const confirm = async ({
    message,
    header,
    ok,
    cancel,
    persistent,
    onClose,
  }: Parameters<TDialogsContext["confirm"]>[number]): Promise<boolean> => {
    return new Promise((resolve) => {
      const handleOkClick = (id: string) => {
        resolve(true);
        closeDialog(id);
      };

      const handleCancelClick = (id: string) => {
        resolve(false);
        closeDialog(id);
      };

      const defineElement = (
        element: ReactElement<{ onClick?: () => void }> | undefined,
        onClick: () => void,
      ) => {
        if (!element) return;

        return cloneElement(element, {
          onClick,
        });
      };

      const handleClose = () => {
        onClose?.();
        resolve(false);
      };

      const id = openDialog({
        component: (
          <ConfirmDialog
            message={message}
            ok={defineElement(ok, () => handleOkClick(id))}
            cancel={defineElement(cancel, () => handleCancelClick(id))}
            onOk={() => handleOkClick(id)}
            onCancel={() => handleCancelClick(id)}
          />
        ),
        persistent,
        onClose: handleClose,
        header,
      });
    });
  };

  return (
    <DialogsContext.Provider value={{ openDialog, closeDialog, confirm }}>
      {children}

      <div id={containerId} />

      {dialogs.map((dialog, index, dialogs) => {
        return (
          <UiDialog
            key={dialog.id}
            ref={(node) => {
              dialogsRef.current.set(dialog.id, node);
            }}
            dialogContainerId={containerId}
            isTopMost={index === dialogs.length - 1}
            persistent={dialog.persistent}
            onClose={dialog.onClose}
            header={dialog.header}
            showCloseButton={dialog.showCloseButton}
            dialogClassName={dialog.dialogClassName}
          >
            {dialog.component}
          </UiDialog>
        );
      })}
    </DialogsContext.Provider>
  );
};

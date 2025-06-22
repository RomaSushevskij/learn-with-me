import type { ReactElement } from "react";
import { UiButton } from "@/shared/ui/ui-button";
import s from "./confirm-dialog.module.scss";

export const ConfirmDialog = ({
  ok,
  cancel,
  message,
  onOk,
  onCancel,
}: {
  message: string;
  ok?: ReactElement;
  cancel?: ReactElement;
  onOk: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className={s.root}>
      <p>{message}</p>
      <div className={s.actions}>
        {cancel ?? <UiButton onClick={onCancel}>{"Cancel"}</UiButton>}
        {ok ?? (
          <UiButton onClick={onOk} color={"primary"}>
            {"Ok"}
          </UiButton>
        )}
      </div>
    </div>
  );
};

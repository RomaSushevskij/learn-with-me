import { MicrophoneIcon } from "@/shared/ui/icons/microphone-icon";

import s from "./ui-microphone-button.module.scss";
import { UiButton } from "@/shared/ui/ui-button";
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

export const UiMicrophoneButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isActive?: boolean;
  }
> = ({ isActive = false, className, ...props }) => {
  return (
    <UiButton withIcon className={clsx(className, s.button)} {...props}>
      {isActive && (
        <>
          <div className={s.wave_1} />
          <div className={s.wave_2} />
        </>
      )}
      <MicrophoneIcon />
    </UiButton>
  );
};

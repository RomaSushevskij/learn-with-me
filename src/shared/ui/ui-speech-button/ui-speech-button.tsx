import { MegaphoneIcon } from "@/shared/ui/icons/megaphone-icon";
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";
import clsx from "clsx";

export const UiSpeechButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isSpeaking?: boolean;
    width?: SVGProps<SVGSVGElement>["width"];
    height?: SVGProps<SVGSVGElement>["height"];
  }
> = ({ className, width, height, isSpeaking = false, ...props }) => {
  return (
    <button className={clsx("active:scale-140 transition px-4 py-1", className)} {...props}>
      <MegaphoneIcon
        className={clsx({ "animate-pulse": isSpeaking })}
        width={width ?? "3rem"}
        height={height ?? "3rem"}
      />
    </button>
  );
};

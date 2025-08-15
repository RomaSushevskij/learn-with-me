import { type ComponentType } from "react";
import clsx from "clsx";

import s from "./ui-core.module.scss";

import { type SpacingSize } from "./types";

export interface SpacingProps {
  marginX?: SpacingSize;
  marginY?: SpacingSize;
  marginTop?: SpacingSize;
  marginBottom?: SpacingSize;
  marginLeft?: SpacingSize;
  marginRight?: SpacingSize;
  paddingX?: SpacingSize;
  paddingY?: SpacingSize;
  paddingTop?: SpacingSize;
  paddingBottom?: SpacingSize;
  paddingLeft?: SpacingSize;
  paddingRight?: SpacingSize;
}

export const withSpacing = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return ({
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    className,
    ...props
  }: P & SpacingProps & { className?: string }) => {
    const spacingClasses = clsx(
      s[`margin_x_${marginX}`],
      s[`margin_y_${marginY}`],
      s[`margin_top_${marginTop}`],
      s[`margin_bottom_${marginBottom}`],
      s[`margin_left_${marginLeft}`],
      s[`margin_right_${marginRight}`],
      s[`padding_x_${paddingX}`],
      s[`padding_y_${paddingY}`],
      s[`padding_top_${paddingTop}`],
      s[`padding_bottom_${paddingBottom}`],
      s[`padding_left_${paddingLeft}`],
      s[`padding_right_${paddingRight}`],
      className,
    );

    return <WrappedComponent {...(props as P)} className={spacingClasses} />;
  };
};

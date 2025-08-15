import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from "react";
import clsx from "clsx";

import { withSpacing } from "@/shared/ui/ui-core";

import s from "./ui-flex.module.scss";

export type FlexGap =
  | "2"
  | "4"
  | "6"
  | "8"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "22"
  | "24"
  | "26"
  | "28"
  | "30"
  | "32"
  | "34"
  | "36"
  | "38"
  | "40"
  | "42"
  | "44"
  | "46"
  | "48"
  | "50";

export type FlexDirection = "row" | "column";

export interface FlexOwnProps<C extends ElementType> {
  direction?: FlexDirection;
  justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
  align?: "stretch" | "start" | "end" | "center" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  columnGap?: FlexGap;
  rowGap?: FlexGap;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  full?: boolean;
  as?: C;
}

export type TFlexProps<C extends ElementType> = PropsWithChildren<FlexOwnProps<C>> &
  Omit<ComponentPropsWithoutRef<C>, keyof FlexOwnProps<C>>;

export const UiFlex = withSpacing(
  <C extends ElementType = "div">({
    direction = "row",
    justify = "start",
    align = "stretch",
    wrap = "nowrap",
    columnGap,
    rowGap,
    children,
    className,
    full,
    as,
    ...props
  }: TFlexProps<C>) => {
    const Component = as || "div";

    const flexClasses = useMemo(() => {
      return clsx(
        s.flexContainer,
        { [s.full]: Boolean(full) },
        s[direction],
        s[wrap],
        s[`justify_${justify}`],
        s[`align_${align}`],
        s[`column_gap_${columnGap}`],
        s[`row_gap_${rowGap}`],
        className,
      );
    }, [direction, justify, align, wrap, className, columnGap, rowGap, full]);

    return (
      <Component className={flexClasses} {...props}>
        {children}
      </Component>
    );
  },
);

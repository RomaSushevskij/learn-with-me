import { type ComponentPropsWithoutRef, type ElementType, type PropsWithChildren } from "react";

import { withSpacing } from "@/shared/ui/ui-core";

import { type FlexOwnProps } from "../ui-flex/ui-flex";
import { UiFlex } from "../ui-flex/ui-flex";

type TUiFlexColumnProps<C extends ElementType> = PropsWithChildren<
  Omit<FlexOwnProps<C>, "direction">
> &
  Omit<ComponentPropsWithoutRef<C>, keyof FlexOwnProps<C>>;

export const UiFlexColumn = withSpacing(
  <C extends ElementType = "div">(props: TUiFlexColumnProps<C>) => {
    return <UiFlex {...props} direction={"column"} />;
  },
);

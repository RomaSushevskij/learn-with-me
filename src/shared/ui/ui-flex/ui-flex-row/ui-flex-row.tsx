import { type ComponentPropsWithoutRef, type ElementType, type PropsWithChildren } from "react";

import { withSpacing } from "@/shared/ui/ui-core";

import { type FlexOwnProps } from "../ui-flex/ui-flex";
import { UiFlex } from "../ui-flex";

type TUiFlexRowProps<C extends ElementType> = PropsWithChildren<FlexOwnProps<C>> &
  Omit<ComponentPropsWithoutRef<C>, keyof FlexOwnProps<C>>;

export const UiFlexRow = withSpacing(<C extends ElementType = "div">(props: TUiFlexRowProps<C>) => {
  return <UiFlex {...props} direction={props.direction ?? "row"} />;
});

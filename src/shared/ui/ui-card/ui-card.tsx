import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import clsx from "clsx";

import s from "./ui-card.module.scss";

type UiCardProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onClick"
> & {
  value: string | number;
  color?: string;
  onClick?: (value: string | number) => void;
};

export const UiCard: FC<UiCardProps> = ({
  value,
  color = "#FFEC99",
  style,
  className,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    onClick?.(value);
  };

  return (
    <div
      className={clsx(className, s.root)}
      style={{
        backgroundColor: color,
        ...style,
      }}
      onClick={handleClick}
      {...props}
    >
      <span className="text-7xl font-extrabold text-white drop-shadow-sm">{value}</span>
    </div>
  );
};

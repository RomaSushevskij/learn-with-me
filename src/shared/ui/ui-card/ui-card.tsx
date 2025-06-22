import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type UiCardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  value: string | number;
  color?: string;
};

export const UiCard: FC<UiCardProps> = ({ value, color = "#FFEC99", style, ...props }) => {
  return (
    <div
      className="py-1 sm:p-4 aspect-video rounded-2xl shadow-xl flex
      items-center justify-center cursor-pointer select-none transition
      transform active:scale-80"
      style={{
        backgroundColor: color,
        ...style,
      }}
      {...props}
    >
      <span className="text-7xl font-extrabold text-white drop-shadow-sm">{value}</span>
    </div>
  );
};

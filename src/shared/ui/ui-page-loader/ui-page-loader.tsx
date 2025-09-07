import UnicornLoader from "/images/unicorn-loader.gif";
import clsx from "clsx";

export const UiPageLoader = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex justify-center items-center", className)}>
      <div className="w-72 h-72 rounded-[50%] relative overflow-hidden">
        <img src={UnicornLoader} alt="Page loader" />
      </div>
    </div>
  );
};

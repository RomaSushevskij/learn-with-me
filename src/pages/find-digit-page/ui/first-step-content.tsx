import { type PropsWithChildren } from "react";

export const FirstStepContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-yellow-50 flex justify-center items-center h-[calc(100dvh-12.5rem)]">
      {children}
    </div>
  );
};

import { UiButton } from "@/shared/ui/ui-button";

export const UiAwardDialog = ({ onOkClick }: { onOkClick?: () => void }) => {
  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="w-[18.75rem] rounded-full overflow-hidden relative">
        <img src={"/images/award-image.png"} className="" alt={"Award image"} />
      </div>
      <UiButton className="w-1/2" onClick={onOkClick}>
        Ok
      </UiButton>
    </div>
  );
};

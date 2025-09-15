import { UiButton } from "@/shared/ui/ui-button";

export const UiSuccessDialog = ({ onOkClick }: { onOkClick?: () => void }) => {
  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="w-[18.75rem] rounded-full overflow-hidden relative">
        <div
          style={{
            background:
              "radial-gradient(circle,rgba(185, 248, 207, 0) 65%, rgba(216, 250, 153, 1) 70%)",
          }}
          className="absolute inset-0 "
        />
        <img src={"/images/success-image.jpg"} className="" alt={"Success image"} />
      </div>
      <UiButton className="w-1/2" onClick={onOkClick}>
        Ok
      </UiButton>
    </div>
  );
};

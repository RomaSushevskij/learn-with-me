import { UiButton } from "@/shared/ui/ui-button";

export const UiErrorDialog = ({ onOkClick }: { onOkClick?: () => void }) => {
  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="w-[18.75rem] sm:w-[31.25rem] rounded-full overflow-hidden relative">
        <div
          style={{
            background:
              "radial-gradient(circle,rgba(255, 202, 201, 0) 65%, rgba(255, 202, 201, 1) 70%)",
          }}
          className="absolute inset-0"
        />
        <img src={"/images/error-image.jpg"} className="" alt={"Success image"} />
      </div>
      <UiButton className="w-1/2" onClick={onOkClick}>
        Ok
      </UiButton>
    </div>
  );
};

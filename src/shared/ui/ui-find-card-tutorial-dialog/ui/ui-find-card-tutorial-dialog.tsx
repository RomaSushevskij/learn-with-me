import { UiButton } from "@/shared/ui/ui-button";

export const UiFindCardTutorialDialog = ({
  message,
  onBtnClick,
}: {
  message: string;
  onBtnClick: () => void;
}) => {
  return (
    <section className="flex flex-col items-center gap-y-8">
      <p className="text-2xl text-center text-balance">{message}</p>
      <UiButton onClick={onBtnClick}>Начать</UiButton>
    </section>
  );
};

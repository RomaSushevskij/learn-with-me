import { DigitsGrid, type DigitType } from "@/entities/digits";
import { GoHomeButton } from "@/features/go-home-button";

export const LearnDigitsPage = () => {
  const handleDigitCardClick = (digit: DigitType) => {
    const utterance = new SpeechSynthesisUtterance(`${digit}`);
    utterance.lang = "ru-RU";

    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 200);
  };
  return (
    <div>
      <div className="mb-6 mx-auto max-w-max">
        <GoHomeButton />
      </div>

      <DigitsGrid onCardClick={handleDigitCardClick} />
    </div>
  );
};

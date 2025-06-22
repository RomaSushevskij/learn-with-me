import { delay } from "@/shared/lib/delay";

export const speakText = async (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  await delay();
  speechSynthesis.speak(utterance);
};

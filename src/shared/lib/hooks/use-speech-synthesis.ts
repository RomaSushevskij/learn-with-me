import { useCallback, useState } from "react";
import { delay } from "@/shared/lib/delay";

export const useSpeechSynthesis = (params?: { delayMs: number }) => {
  const { delayMs } = params ?? {};
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    async (text: string) => {
      // Останавливаем, если что-то говорит или в очереди
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      await delay(delayMs);
      speechSynthesis.speak(utterance);
    },
    [delayMs],
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
};

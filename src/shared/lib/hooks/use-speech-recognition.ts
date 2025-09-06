import { useEffect, useState, useRef, useCallback } from "react";

export const useSpeechRecognition = (args?: {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  onError?: () => void;
  onResult?: (text: string) => void;
}) => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const speechRecognition = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if (!speechRecognition.current) return;

    speechRecognition.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!speechRecognition.current) return;

    speechRecognition.current.stop();
    setIsListening(false);
  };

  // Обработчик для события "onresult" (получение результата распознавания речи)
  const handleResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      if (!speechRecognition.current) return;

      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
      args?.onResult?.(voiceText);
      speechRecognition.current.stop();
      setIsListening(false);
    },
    [args],
  );

  // Обработчик для события "onend" (завершение распознавания речи)
  const handleEnd = useCallback(() => {
    console.log("end");
    if (!speechRecognition.current) return;

    speechRecognition.current.stop();
    setIsListening(false);
  }, []);

  // Обработчик для события "onend" (завершение распознавания речи)
  const handleError = useCallback(() => {
    if (!speechRecognition.current) return;

    speechRecognition.current.stop();
    setIsListening(false);
    args?.onError?.();
  }, [args]);

  // Инициализация объекта SpeechRecognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      speechRecognition.current = new webkitSpeechRecognition();
    }
  }, []);

  useEffect(() => {
    if (!speechRecognition.current) return;
    speechRecognition.current.continuous = args?.continuous ?? true;
    speechRecognition.current.interimResults = args?.interimResults ?? false;
    speechRecognition.current.lang = args?.lang ?? "ru-RU";
  }, [args]);

  useEffect(() => {
    if (!speechRecognition.current) return;

    // Подписываемся на события
    speechRecognition.current.onresult = handleResult;
    speechRecognition.current.onend = handleEnd;
    speechRecognition.current.onerror = handleError;

    // Очистка подписок при размонтировании компонента
    return () => {
      if (!speechRecognition.current) return;

      speechRecognition.current.onresult = null;
      speechRecognition.current.onend = null;
      speechRecognition.current.onerror = null;
    };
  }, [handleResult, handleEnd, handleError]);

  const hasRecognitionSupport = Boolean(speechRecognition.current);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  };
};

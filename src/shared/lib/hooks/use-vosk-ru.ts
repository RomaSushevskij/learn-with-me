import { createModel, type KaldiRecognizer, Model } from "vosk-browser";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MicrophoneStream from "microphone-stream";

import { audioBucket, AudioStreamer } from "@/shared/lib/audio";

type TVoskResult = {
  result?: Array<{
    conf: number;
    start: number;
    end: number;
    word: string;
  }>;
  text: string;
};

export type TVoskResultHandler = (args: {
  text: string;
  setUtterance: Dispatch<SetStateAction<TVoskResult | null>>;
}) => void;

export function useVoskRu({
  modelPath,
  onResult,
}: {
  modelPath: string;
  onResult?: (args: {
    text: string;
    setUtterance: Dispatch<SetStateAction<TVoskResult | null>>;
  }) => void;
}) {
  const modelRef = useRef<Model | null>(null);
  const recognizerRef = useRef<KaldiRecognizer | null>(null);
  const micStream = useRef<MicrophoneStream | null>(null);
  const audioStreamer = useRef<AudioStreamer | undefined>(undefined);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isModelInitialized, setModelInitialized] = useState(false);
  const [utterance, setUtterance] = useState<TVoskResult | null>(null);

  const startRecognitionStream = useCallback(async () => {
    if (!recognizerRef.current) return;

    if (!micStream.current) {
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });

        micStream.current = new MicrophoneStream({
          objectMode: true,
          bufferSize: 1024,
        });

        micStream.current.setStream(mediaStreamRef.current);
      } catch (err) {
        console.error(err);
      }
    } else {
      micStream.current.unpipe(audioStreamer.current);
      micStream.current.pipe(audioBucket);
    }

    audioStreamer.current = new AudioStreamer(recognizerRef.current, {
      objectMode: true,
    });
  }, []);

  const connectToRecognizer = useCallback(() => {
    if (!audioStreamer.current) return;

    micStream.current?.unpipe(audioBucket); // отключаем от заглушки
    micStream.current?.pipe(audioStreamer.current); // подключаем к распознавателю
    setIsListening(true);
  }, []);

  const disconnectFromRecognizer = useCallback(() => {
    micStream.current?.unpipe(audioStreamer.current); // отключаем от распознавания
    micStream.current?.pipe(audioBucket); // подключаем к заглушке
    setIsListening(false);
  }, []);

  const handleResult = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.type !== "result") {
        return;
      }

      const result: TVoskResult = customEvent.detail.result;
      setUtterance(result);
      disconnectFromRecognizer();
      onResult?.({ text: result.text, setUtterance });
    },
    [onResult, disconnectFromRecognizer],
  );

  useEffect(() => {
    const init = async () => {
      try {
        if (!modelRef.current) {
          modelRef.current = await createModel(modelPath);
        }

        if (!recognizerRef.current) {
          recognizerRef.current = new modelRef.current.KaldiRecognizer(48000);
        }

        recognizerRef.current.setWords(true);
        recognizerRef.current.addEventListener("result", handleResult);

        startRecognitionStream();
      } catch (error) {
        console.log(error);
      }
    };

    init().then(() => {
      console.log({ modelRef });
      setModelInitialized(true);
    });

    return () => {
      recognizerRef.current?.removeEventListener("result", handleResult);
    };
  }, [modelPath, startRecognitionStream, handleResult]);

  useEffect(() => {
    return () => {
      // остановка микрофона и медиа-потоков
      if (micStream.current) {
        micStream.current.unpipe(audioStreamer.current);
        micStream.current.unpipe(audioBucket);
        micStream.current.stop();
        micStream.current = null;
      }

      // очистка AudioStreamer
      audioStreamer.current = undefined;

      // остановка модели и распознавателя
      recognizerRef.current?.remove(); // буферы
      recognizerRef.current = null;

      modelRef.current?.terminate();
      modelRef.current = null;

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  return {
    connectToRecognizer,
    disconnectFromRecognizer,
    utterance,
    isListening,
    isModelInitialized,
  };
}

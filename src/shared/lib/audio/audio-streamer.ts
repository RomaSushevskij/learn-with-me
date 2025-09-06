import { Duplex, type DuplexOptions } from "readable-stream";
import { type KaldiRecognizer } from "vosk-browser";

export class AudioStreamer extends Duplex {
  constructor(
    public recognizer: KaldiRecognizer,
    options?: DuplexOptions,
  ) {
    super(options);
  }

  public _write(chunk: AudioBuffer, _: unknown, callback: () => void) {
    const buffer = chunk.getChannelData(0);
    if (this.recognizer && buffer.byteLength > 0) {
      this.recognizer.acceptWaveform(chunk);
    }
    callback();
  }
}

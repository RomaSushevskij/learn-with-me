import { Writable } from "readable-stream";

export const audioBucket = new Writable({
  write: function (_, __, callback) {
    callback();
  },
  objectMode: true,
  decodeStrings: false,
});

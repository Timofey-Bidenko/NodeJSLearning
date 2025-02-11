import { EventEmitter } from "node:events";
import fs from "node:fs";
import { Writable, Transform } from "node:stream";
import formatMessage from "./formatter.js"

export const logEmitter = new EventEmitter();

const logPath = "l0calstorage/app.log";
const logStream = fs.createWriteStream(logPath, { flags: "a" });

const logFormatter = new Transform({
    transform(chunk, encoding, callback) {
        const { level, message } = JSON.parse(chunk.toString());

        const formattedMsg = formatMessage(level, message)
        if (formattedMsg) {
            console.log(formattedMsg);
        }
        callback(null, formattedMsg + "\n");
    }
});

const logWriter = new Writable({
    write(chunk, encoding, callback) {
        logStream.write(chunk, callback);
    }
});

logFormatter.pipe(logWriter);

logEmitter.on("log", (logData) => {
    logFormatter.write(JSON.stringify(logData));
});

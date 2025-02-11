import fs from "node:fs"
import path from "node:path"
import levels from "../customTypes/loggerLevelTypes.js"
import { logEmitter } from "./logStreamEmitter.js"


class Logger {
    constructor(logPath = "l0calstorage/app.log") {
        this.logPath= logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath), 
                {recursive: true}
            )
        }
    }

    __log(level, msg) {
        logEmitter.emit("log", { level, message: msg });
    }

    info(msg) {
        this.__log(levels.INFO, msg)
    }
    warning(msg) {
        this.__log(levels.WARNING, msg)
    }
    error(msg) {
        this.__log(levels.ERROR, msg)
    }
    emergency(msg) {
        this.__log(levels.EMERGENCY, msg)
    }
    alert(msg) {
        this.__log(levels.ALERT, msg)
    }
    critical(msg) {
        this.__log(levels.CRITICAL, msg)
    }
    notice(msg) {
        this.__log(levels.NOTICE, msg)
    }
    debug(msg) {
        this.__log(levels.DEBUG, msg)
    }

    getAllMethods() {
        return Object.values(levels)
    }
}

export default Logger



// import Logger from "../CustomModules/logger/index.js"

// const logger = new Logger()

// logger.getAllMethods().forEach((methodName, i) => {
//     logger[methodName]("Hello World!")
//     try {
//         const a = 5
//         a = 3
//     } catch (err) {
//         logger[methodName](err)
//     }
// })
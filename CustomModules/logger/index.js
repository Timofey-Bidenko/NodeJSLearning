import fs from "node:fs"
import path from "node:path"
import levels from "../customTypes/loggerLevelTypes.js"
import createLogEmitter from "./logStreamEmitter.js"

class Logger {
    constructor(logPath = "app.log") {
        this.logPath = `l0calstorage/${logPath.length > 0 ? logPath : "app.log"}`

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath), 
                {recursive: true}
            )
        }

        this.logEmitter = createLogEmitter(this.logPath)
    }

    __log(level, msg) {
        this.logEmitter.emit("log", { level, message: msg });
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
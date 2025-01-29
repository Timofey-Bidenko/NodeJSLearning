import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import formatMessage from "./formatter.js"


class Logger {
    constructor(logPath = "logs/app.log") {
        this.logPath= logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath), 
                {recursive: true}
            )
        }
    }

    __log(level, msg) {
        const formattedMsg = formatMessage(level, msg)
        if (formattedMsg) {
            console.log(formattedMsg);
        
            // fs.appendFileSync(this.logPath, `${formattedMsg} \n`, function(err) {
            //     if (err) {
            //         console.log(`Error writing to file at ${this.logPath} with error ${err.message}`);
            //     }
            // })
        }
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
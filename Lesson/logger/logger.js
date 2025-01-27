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

        fs.appendFileSync(this.logPath, `${formattedMsg} \n`, function(err) {
            if (err) {
                console.log(`Error writing to file at ${this.logPath} with error ${err.message}`);
            }
        })
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
}

export default Logger
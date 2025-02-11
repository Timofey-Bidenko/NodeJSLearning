import chalk from "chalk";
import levels from "../customTypes/loggerLevelTypes.js";
import envs from "../customTypes/envTypes.js";

const appEnv = process.env.APP_ENV;

function formatMessage(level, msg) {
    const timestamp = new Date().toISOString();
    let colorFn = chalk.blue;

    if (msg instanceof Error) {
        msg = `${msg.name} ~ Exception >>> "${msg.message}" ${"stack" in msg ? `<<<>>> Stack >>> "${msg.stack}"` : ""} ${"cause" in msg ? `<<<>>> Cause >>> "${msg.cause}"` : ""}`
    }

    switch (level) {
        case levels.EMERGENCY:
            colorFn = chalk.bgRedBright;
            break;
        case levels.ALERT:
            colorFn = chalk.yellowBright;
            break;
        case levels.CRITICAL:
            colorFn = chalk.redBright;
            break;
        case levels.ERROR:
            colorFn = chalk.red;
            break;
        case levels.WARNING:
            colorFn = chalk.yellow;
            break;
        case levels.NOTICE:
            colorFn = chalk.blue;
            break;
        case levels.INFO:
            colorFn = chalk.blue;
            break;
        case levels.DEBUG:
            colorFn = chalk.green;
            break;
        default:
            level = "UNKNOWN"
            colorFn = chalk.gray;
    }

    const logMessage = colorFn(`[${timestamp}], ${level}: ${msg}`);

    if (
        appEnv === envs.LOCAL ||
        (appEnv === envs.DEV && [levels.EMERGENCY, levels.ALERT, levels.CRITICAL, levels.ERROR, levels.WARNING, levels.NOTICE].includes(level)) ||
        (appEnv === envs.PROD && [levels.EMERGENCY, levels.ALERT, levels.CRITICAL, levels.ERROR].includes(level))
    ) {
        return logMessage
    } else {
        return colorFn(`[${timestamp}], process.env.APP_ENV NULL   ~or~   UNKNOWN VALUE   ~or~   .env NOT SET;
    DEBUG_INFO: ┑
    ┠   LEVEL_TYPE: ${level};
    ┖   ENV_TYPE: ${appEnv};`)
    }
}

export default formatMessage;
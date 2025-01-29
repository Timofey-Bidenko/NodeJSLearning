import Logger from "./logger/logger.js"

const logger = new Logger()

logger.getAllMethods().forEach((methodName, i) => {
    logger[methodName]("Hello World!")
    try {
        const a = 5
        a = 3
    } catch (err) {
        logger[methodName](err)
    }
})


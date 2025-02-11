import Logger from "../CustomModules/logger/index.js"

const logger = new Logger("")

logger.getAllMethods().forEach((methodName, i) => {
    logger[methodName]("Hello World!")
})
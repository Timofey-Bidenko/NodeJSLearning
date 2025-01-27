import Logger from "./logger/logger.js"

const logger = new Logger()

logger.info("E")
logger.warning("E")
logger.error("E")

console.log(process.env.APP_ENV);
console.log(process.env.DB_PASS);
console.log(process.env.API_KEY);

// let i = 0
// setInterval(() => {
//     process.stdout.write("\r" + i++);
// }, 1);

process.on("SIGINT", () => { // CTRL + C
    console.log("SIGINT called");
    process.exit(0)
})

process.on("SIGTERM", () => { // kill -SIGTERM process.pid
    console.log("SIGTERM called");
    process.exit(0)
})
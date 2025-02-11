// This is just like wait() in Luau or sleep() in Python
// Is capable of working with loops. 
// e.g. while (await wait(1000)) {console.log("A second passed!")}
export default async function(sleepTime) {
    return new Promise((y, n) => {
        setTimeout(() => {
            y(true)
        }, sleepTime);
    })
}



// import { convertSeconds } from "../CustomModules/converters/formatTime.js";
// import wait from "../CustomModules/luauWait/index.js"

// let step = 1 // number // seconds to add each iteration
// let interval = 1000 // number // milliseconds between each iteration

// let i = 0
// while (await wait(interval)) {
//     i += step
//     process.stdout.write('\r' + convertSeconds(i))
// }
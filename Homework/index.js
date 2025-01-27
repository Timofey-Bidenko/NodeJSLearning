import { convertSeconds } from "./formatTime.js";
import { sleep } from "./sleep.js";

let step = 1 // number // seconds to add each iteration
let interval = 1000 // number // milliseconds between each iteration

let i = 0
while (await sleep(interval)) {
    i += step
    process.stdout.write('\r' + convertSeconds(i))
}
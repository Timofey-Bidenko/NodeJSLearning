import { EventEmitter } from "node:events"

let n = 0
const numEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]



const emitter = new EventEmitter
emitter.on("call", function() {
    setImmediate(() => console.log(`${numEmojis[n++]}   Async code!`))
})
emitter.on("call", function() {
    setImmediate(() => console.log("   Async Hellow World!"))
})
emitter.on("call", function() {
    setImmediate(() => console.log("   Async End."))
})

emitter.on("asyncCallback", setImmediate)

let i = 0

setInterval(() => {
    console.log(`${numEmojis[n++]}  ${++i} × Sync code`); // this happens first
    emitter.emit("call") // 4th
    console.log(`${numEmojis[n++]}  CTRL+C to stop!`); // this happens 2nd
    emitter.emit("asyncCallback", () => {console.log(`${numEmojis[n++]}___-_-_-___-_-_-___`)}) // 5th
    console.log(`${numEmojis[n++]}  Current count = ${i}`); // this happens 3rd
    emitter.emit("asyncCallback", () => {
        n = 0
        console.log("n reset!")
        console.log("")
    }) // 6th (last)
}, 1000);
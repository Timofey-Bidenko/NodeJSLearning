import EventEmitter from "./emitter.js"

const emitter = new EventEmitter
emitter.addEventListener("call", function() {
    console.log("Async code!");
})
emitter.addEventListener("call", function() {
    console.log("Async Hellow World!");
})
emitter.addEventListener("call", function() {
    console.log("Async.");
})

emitter.addEventListener("spaceOutput", console.log)

let i = 0

setInterval(() => {
    console.log(`${++i}×Sync code`); // this happens first
    emitter.fireEvent("call") // 4th
    console.log("CTRL+C to stop!"); // this happens 2nd
    emitter.fireEvent("spaceOutput", "") // 5th (last)
    console.log(`Current count = ${i}`); // this happens 3rd
}, 1000);
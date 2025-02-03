import { Readable } from "node:stream"

const d = ["Hello", "World", "!"]

// const stream = new Readable({
//     read() {
//         d.forEach(v => this.push(v))
//         this.push(null)
//     }
// })


// stream.on("data", (data) => {
//     console.log(data);
//     console.log(data.toString("utf8"));
// })
// stream.on("end", () => {
//     console.log("Stream ended because of new date being null");
// })

class ReadableClass extends Readable {
    constructor(options) {
        super(options)
    }

    _read() {
        d.forEach(v => this.push(v))
        this.push(null)
    }
}

const stream = new ReadableClass({
    highWaterMark: 10,
    encoding: "utf8",
    objectMode: true, // needed if working with objects too
})

stream.on("data", (data) => {
    console.log(data.toString(stream.encoding));
})
stream.on("end", () => {
    console.log("Stream ended because of new date being null");
})
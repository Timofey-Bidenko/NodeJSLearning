import { Readable, Writable } from "node:stream"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"


const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const d = ["Hello", "World"]

// const stream = new Readable({
//     read() {
//         d.forEach(itm => this.push(itm))
//         this.push(null)
//     }
// })

// class ReadableClass extends Readable {
//     constructor(fileName, options = {}) {
//         super(options)

//         this.fd = fs.openSync(fileName, `r`) // fd >>> fileData // basically an object that links us to the file
//         this.bufferSize = options["bufferSize"] || 16384
//         this.position = 0
//     }

//     _read(size) {
//         const buffer = Buffer.alloc(size)
//         fs.read(this.fd, buffer, 0, size, this.position, (err, bytesRead) => {
//             if (err) {
//                 // destroy object
//                 this.destroy(err)
//             }

//             if (bytesRead > 0) {
//                 this.push(buffer.subarray(0, bytesRead)) // slice is depracated, use subarray instead

//                 this.position += bytesRead
//             } else {
//                 this.push(null) // stop the readable stream
//                 fs.closeSync(this.fd)
//             }
//         })
//     }

//     _destroy(err, cb) {
//         if (this.fd) {
//             fs.closeSync(this.fd)
//         }
//         if (cb) {
//             cb(err)
//         }
//     }

// }



// const filePath = path.join(__dirname, "users.txt")

// const stream = new ReadableClass(filePath, {
//     highWaterMark: 64 * 1024,
//     encoding: "utf8"
// })

// let count  = 0

// stream.on("data", (chunk) => {

//     ++count
//     console.log(chunk.toString("utf8"))

//     stream.pause()

//     setTimeout(() => {
//         stream.resume()
//     }, 1000);
// })

// stream.on('end', () => {
//     console.log('Stream finished', "count:", `${count}`)
// })



// const writable = new Writable({
//     write(chunk, en, next) {
//         console.log("Got: ", chunk.toString("utf8"))

//         setTimeout(next, 1000);
//     }
// })

// class WritableStream extends Writable {

// }

// const wStream = new WritableStream






const wStream = fs.createWriteStream("bigData.txt")

let i = 1_000_000

function write() {
    let success = true

    while (i > 0 && success) {
        success = wStream.write(`${1_000_001 - i}\n`)
        i--
    }

    if (i > 0) {
        wStream.once("drain", write)
    } else {
        wStream.end()
    }
}
write()

// wStream.once("drain", write)
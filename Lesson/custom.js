import chalk from 'chalk';
import { randomInt } from "./foo1.js"
import generateLorem from "./lorem.js"


// Setup //
const outputString = generateLorem("characters", 101) //"Hello!worlD"
const ms = 50
const loopsPerChar = 25
const additionalSpeedPerChar = 10
const additionalLoopsPerChar = -2
const style = 2 // 0 >>> default one line, 1 >>> align left (triangle left), 2 >>> align center (tree), 3 >>> align right (triangle right)





const Modifiers = [
    "bold",
    "dim",
    "italic",
    "underline",
    "overline",
    "inverse",
    // "hidden",
    "strikethrough",
    "visible"
]
const Colors = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "blackBright",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright",
    "whiteBright",
]



let i = 0
let t = 0
let lastPrint = ""
let lastContent = ""
function print() {
    const randomModifier = Modifiers[randomInt(0, Modifiers.length - 1)]
    const randomColor = Colors[randomInt(0, Colors.length - 1)]
    const outputTheme = chalk[randomModifier][randomColor]
    
    lastPrint = outputTheme(outputString[i])
    const thisContent = lastContent + lastPrint
    const lengthDiff = outputString.length - i
    const offsetLength = style % 4 === 2 ? Math.floor(lengthDiff / 2)  : style % 4 === 3 ? lengthDiff - 1 : 0
    const offset = Array(offsetLength).fill(" ").join("")

    process.stdout.write('\r' + offset + thisContent)
}
function delayedWork() {
    setTimeout(() => {
        work()
    }, Math.max(1, ms - (additionalSpeedPerChar * i)));
}
function work() {
    print()
    t = ++t % Math.max(1, loopsPerChar + (additionalLoopsPerChar * i))
    if (t === 0) {
        lastContent += lastPrint
        i++
        if (style % 4 !== 0) {
            process.stdout.write('\n')
        }
        if (i < outputString.length) {
            // clearInterval(interval)
            delayedWork()
        }
        return
    }
    delayedWork()
}
setTimeout(() => {
    work()
}, ms);
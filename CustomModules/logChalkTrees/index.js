import chalk from 'chalk';
import randomInt from "../mathRandom/index.js"
import generateLorem from "./lorem.js"


// Setup //
const defaults = {
    outputString: generateLorem("characters", 101), //"Hello!worlD"
    ms: 50,
    loopsPerChar: 25,
    additionalSpeedPerChar: 10,
    additionalLoopsPerChar: -2,
    style: 2, // 0 >>> default one line, 1 >>> align left (triangle left), 2 >>> align center (tree), 3 >>> align right (triangle right)
}



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


export default function (outputString = defaults.outputString, ms = defaults.ms, loopsPerChar = defaults.loopsPerChar, additionalSpeedPerChar = defaults.additionalSpeedPerChar, additionalLoopsPerChar = defaults.additionalLoopsPerChar, style = defaults.style) {

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
        const offsetLength = style % 4 === 2 ? Math.floor(lengthDiff / 2) : style % 4 === 3 ? lengthDiff - 1 : 0
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
}

// import logChalkTree from "../CustomModules/logChalkTrees/index.js";
// logChalkTree("Hello World! Hi Node.js!")
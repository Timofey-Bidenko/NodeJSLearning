// CommonJS module

function con(b) {
    console.log({ b });
} // "private" function of this file, can't be accesed by different files

function fn(a) {
    con(a);
} // "public" function of this file, can be accesed by different files

function sum(a, b) {
    return a + b
}

function randomInt(a, b) {
    const c = Math.min(a, b)
    const d = Math.max(a, b)
    return Math.round(Math.random() * (d - c))
}

export {fn, sum, randomInt} // everything we want to export and make "public", to enable other files using this.
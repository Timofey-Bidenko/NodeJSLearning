// Protects from default exit behaviour on uncaught exceptions (errors)
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception", err.message);

    process.exit(1) // initialize default exit behaviour manually
})
// throw new Error("Some Error")



// Protects from default exit behaviour on Unhandled PROMISE Rejections
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection", err.message);

    process.exit(1) // initialize default exit behaviour manually
})
/* 
try {
    throw new Error("Handled Promise Rejection")
} catch (err) {
    console.log(err.message);
} // handles rejection itself, no need in: process.on("unhandledRejection", (err)
 */
// Promise.reject("Unhandled promise rejection") // handled by:  process.on("unhandledRejection", (err)


console.log("Hi");

await new Promise((y, n) => {
    setTimeout(() => {
        y(1)
    }, 1000);
})

console.log("Bye");

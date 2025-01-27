export const sleep = async (sleepTime) => {
    return new Promise((y, n) => {
        setTimeout(() => {
            y(true)
        }, sleepTime);
    })
}
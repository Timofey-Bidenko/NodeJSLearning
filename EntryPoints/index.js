import http from "node:http"
import wait from "../CustomModules/luauWait/index.js"
import random from "../CustomModules/mathRandom/index.js"

const APP_PORT = 3000
const server = http.createServer()

/* 
TODO

Реалізувати свій сервер на node http, який вибірково (10% запитів) повертає 500 помилку, а всі інші запити відпрацьовують з затримкою від 1 до 3 секунд. 

Докладніше: сервер має повертати response з затримкою, від 1 до 3 секунд, цей час має бути рандомним, а також приблизно 10% запитів "падають" з помилками 500
*/

let requestsTotal = 0

server.on("request", async (req, res) => {
    requestsTotal++

    const isError = Math.random() >= 0.9
    res.writeHead(isError ? 500 : 200, {
        "content-type": "text/plain"
    })
    await wait(random(1000, 3000))

    if (isError) return res.end(`Internal Server Error (${requestsTotal})`);
    res.end(`Hello World! ${requestsTotal}`)
})


server.listen(APP_PORT, () => {
    console.log(`HTTP Server is listening on port ${APP_PORT}
Go to: http://localhost:${APP_PORT}`)
})
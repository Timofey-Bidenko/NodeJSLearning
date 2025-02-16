import http from "http"
import fs from "node:fs"
import { getUser } from "../ServerStorage/Services/user.service"
import { getPost } from "../ServerStorage/Services/post.service"


const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)
global.__filname = __filname
global.__dirname = __dirname

const APP_PORT = 3000

const server = http.createServer()

server.on("request", (request, result) => {
    // console.log("URL ~>", request.url, request.method);

    if (String(request.url).startsWith("/upload")) {
        const contentType = request.headers["content-type"]
        const boundary = `--${contentType.split("boundary=")[1]}`

        let body = Buffer.alloc(0)
        request.on("data", chunk => {
            body = Buffer.concat([body, chunk])
            // console.log(chunk.toString("utf8"));
        })
        request.on("end", {

        })

        result.writeHead(200, {
            "content-type": "text/plain"
        })
        result.end("File Uploaded")
        return
    }

    if (String(request.url).startsWith("/static")) {
        let fileData = staticRoutes(request)
        let code = 200

        if (!fileData) {
            fileData = getNotFoundPage()
            code = 404
        }

        result.writeHead(code, {
            "content-type": "text/html",
        })
        result.end(fileData)
    }

    if (String(request.url).startsWith("/api/v1")) {
        const routes = apiRoutes()

        for (const route of routes) {
            const match = String(request.url).match(route.pattern)
            if (match) {
                const data = route.handler(match[1])
                result.writeHead(200, {
                    "content-type": "application/json"
                })
                result.end(JSON.stringify(data))
                return
            }
        }
    }

    result.writeHead(404, {
        "content-type": "application/json"
    })
    result.end(getNotFoundPage())
})

function apiRoutes() {
    return [
        {
            pattern: /^\/api\/v1\/users\/(\d+)$/,
            handler: (id) => getUser(id),
        },
        {
            pattern: /^\/api\/v1\/posts\/(\d+)$/,
            handler: (id) => getPost(),
        }
    ]
}

function staticRoutes(request) {
    const filePath = `${global.__dirname}${request.url}`

    if (!fs.existsSync(filePath)) {
        return false
    }

    if (fs.lstatSync(filePath).isDirectory()) {
        throw new Error("403 Forbidden action")
    }

    if (fs.lstatSync(filePath).isFile()) {
        return fs.readFileSync(filePath)
    }

    return false
}

function getNotFoundPage() {
    const filePath = `${global.__dirname}/static/404.html`
    return fs.readFileSync(filePath)
}

server.listen(APP_PORT, () => {
    console.log(`HTTP Server Listening on port ${APP_PORT}`);
})
import path from "node:path"
import { fileURLToPath } from "node:url"
import express, { json } from "express"
import getLink from "../CustomModules/getLink/index.js"
import {viewRouter} from "../src/routes/view.js"
import session from "express-session"
import cookieParser from 'cookie-parser'
const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename))

global.__filename = __filename
global.__dirname = __dirname

app.use(cookieParser())
app.use(json())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "pug")
app.set("views", "./src/views/")

const AppPort = process.env.AppPort
const linkRoot = getLink()

app.use("/", viewRouter)

app.use(session({
    secret: "keyboard kat",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))


app.use((req, res, next) => {
    res.status(404).send("Not Found")
})
app.use((error, req, res, next) => {
    console.log({
        msg: error?.message
    })

    res.status(500).send("error on server side")
})

const appRunning = new Promise((resolve) => {
    app.listen(AppPort, () => {
        console.log(`Server running on port App_Port >>> ${linkRoot}`)
        resolve(true)
    })
})

await appRunning

import init from "../src/services/DBCleanup.js"
init()
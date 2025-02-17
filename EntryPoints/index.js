import path from "node:path";
import {fileURLToPath} from "node:url";
import express, {json} from "express";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
global.__fileName = __fileName
global.__dirname = __dirname

const APP_PORT = 3000

const app = express();

// app.all("/", (req, res) => {
//     res.send("Hello, World!");

//     // res.redirect("")
// });

// app.get("/", (req, res) => {
//    res.send("Hello, World!");
// });

// Patterns: example: ab*cd our route has to start with ab and end with cd, anything in between is still valid, because of * sign
app.get("/ab*cd", (req, res) => {
    res.send(req.url);
});

app.listen(APP_PORT, () => {
    console.log(`Server listening on port ${APP_PORT}
Link: http://localhost:${APP_PORT}`);
});

/* 
Використовувати Express.js для створення веб-сервера.

Реалізація RESTful API для роботи з даними (GET, POST, PUT, DELETE запити).

Створити додаток TO-DO, який дозволяю:

додати нові таски,  (POST /items)
переглянути існуючі,  (GET /items) 
міняти статус (new/done)  (PUT /items/:itemId)
видаляти таски (DELETE /items/:itemId)
*/
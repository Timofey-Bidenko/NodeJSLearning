import path from "node:path"
import { fileURLToPath } from "node:url"
import express, { json } from "express";
import getLink from "../CustomModules/getLink/index.js"
import {viewRouter} from "../src/routes/view.js"
import session from "express-session";
const app = express();


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename))

global.__filename = __filename
global.__dirname = __dirname

app.use(json());
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "pug");
app.set("views", "./src/views/");

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

/* 
app.post("/:mainKey", (req, res) => {
    let textRequired = true
    const mainKey = req.params.mainKey;
    
    if (!DS[mainKey]) {
        DS[mainKey] = { localId: 0, items: [] }
        textRequired = false
    };

    if (!textRequired) res.json(DS);



    if (!req.body || !req.body.text) return res.status(400).json({ error: `"text": "[Your text here]" in a json is required` });
    
    const newId = DS[mainKey].localId + 1;
    const item = { id: newId, text: req.body.text, status: "new" };
    DS[mainKey].items.push(item);
    DS[mainKey].localId = newId;

    res.json(item);
});

app.get("/:mainKey", (req, res) => {
    const mainKey = req.params.mainKey;
    if (!DS[mainKey]) return res.sendStatus(404);
    
    res.render("index", { linkRoot: linkRoot, tasks: DS[mainKey].items, currentUrl: `/${mainKey}` });
});

app.get("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params;
    if (!DS[mainKey]) return res.sendStatus(404);
    
    const item = DS[mainKey].items.find(i => i.id === parseInt(itemId));
    if (!item) return res.sendStatus(404);

    res.json(item);
});

app.put("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params;
    if (!DS[mainKey]) return res.sendStatus(404);
    
    const item = DS[mainKey].items.find(i => i.id === parseInt(itemId));
    if (!item) return res.sendStatus(404);

    item.status = item.status === "new" ? "done" : "new";
    res.json(item);
});

app.delete("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params;
    if (!DS[mainKey]) return res.sendStatus(404);
    
    const lastLength = DS[mainKey].items.length;
    DS[mainKey].items = DS[mainKey].items.filter(i => i.id !== parseInt(itemId));
    if (DS[mainKey].items.length === lastLength) return res.sendStatus(404);

    res.sendStatus(200);
});

app.all("*", (req, res) => {
    res.render("index", { linkRoot: linkRoot, mainKeys: Object.keys(DS), tasks: [], currentUrl: `/` });
}); 
*/

app.listen(AppPort, () => console.log(`Server running on port App_Port >>> ${linkRoot}`));
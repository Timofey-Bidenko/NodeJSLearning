import getLink from "../../CustomModules/getLink/index.js";
import { DS } from "../middleware/dataStore.js";

const linkRoot = getLink();

function updateLastActive(mainKey) {
    try {
        DS[mainKey]["lastActive"] = Date.now()
    } catch {

    }
}

export function createTask(req, res) {
    const { textValid } = req

    const { mainKey } = req.params;
    const newId = DS[mainKey].localId + 1;

    if (!textValid) return res.json(DS[mainKey]);

    const item = { id: newId, text: req.body.text, status: "new" };
    DS[mainKey].items.push(item);
    DS[mainKey].localId = newId;

    res.json(item);
}

export function getTasks(req, res) {
    const { mainKey } = req.params;
    res.render("index", { linkRoot, tasks: DS[mainKey].items, currentUrl: `/${mainKey}` });
}

export function getTask(req, res) {
    res.json(req.item);
}

export function updateTask(req, res) {
    req.item.status = req.item.status === "new" ? "done" : "new";
    res.json(req.item);
}

export function deleteTask(req, res) {
    DS[req.params.mainKey].items = DS[req.params.mainKey].items.filter(i => i.id !== req.item.id);
    res.sendStatus(200);
}

export function renderHome(req, res) {
    res.render("index", { linkRoot, tasks: [], currentUrl: `/`, title: "To-Do App" });
}

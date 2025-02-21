import express, { json } from "express";
const app = express();
app.use(json());



const DS = {}

app.post("/:mainKey", (req, res) => {
    if (!req.body || !req.body.text) return res.status(400).json({error: `"text": "[Your text here]" in a json is required`});

    const mainKey = req.params.mainKey

    if (!DS[mainKey]) DS[mainKey] = {
        localId: 0,
        items: []
    };
    const { localId, items } = DS[mainKey]
    const newId = localId + 1

    const item = { id: newId, text: req.body.text, status: "new" };
    items.push(item);
    DS[mainKey].localId = newId
    res.json(item);
});

app.get("/:mainKey", (req, res) => {
    const mainKey = req.params.mainKey

    if (!DS[mainKey]) return res.sendStatus(404);
    res.json(DS[mainKey].items)
});
app.get("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params

    if (!DS[mainKey]) return res.sendStatus(404);
    const items = DS[mainKey].items

    const item = items.find(i => i.id === parseInt(itemId));
    if (!item) return res.sendStatus(404);

    res.json(item);
});

app.put("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params

    if (!DS[mainKey]) return res.sendStatus(404);
    const items = DS[mainKey].items

    const item = items.find(i => i.id === parseInt(itemId));
    if (!item) return res.sendStatus(404);

    item.status = item.status === "new" ? "done" : "new";
    res.json(item);
});

app.delete("/:mainKey/:itemId", (req, res) => {
    const { mainKey, itemId } = req.params

    if (!DS[mainKey]) return res.sendStatus(404);
    let items = DS[mainKey].items

    const lastLength = items.length;
    DS[mainKey].items = items.filter(i => i.id !== parseInt(itemId));
    if (DS[mainKey].items.length === lastLength) return res.sendStatus(404);

    res.sendStatus(200);
});

app.all("*", (req, res) => {
    res.json(DS);
})

app.listen(3000, () => console.log("Server running on port 3000 >>> http://localhost:3000/"));
import getLink from "../../CustomModules/getLink/index.js"
import Item from "../models/item.model.js"
import sequelize from "../models/index.js"

const linkRoot = getLink()

export async function createTask(req, res) {
    const { user, textValid } = req
    if (!textValid) return res.json({ error: "Invalid text input" });

    const newId = user.localID + 1
    const t = await sequelize.transaction()

    try {
        const newItem = await Item.create(
            { id: newId, mainKeyId: user.mainKeyId, text: req.body.text },
            { transaction: t }
        )

        user.localID = newId
        await user.save({ transaction: t })

        await t.commit()
        res.json(newItem)
    } catch (error) {
        console.error("Error creating task:", error)
        
        try {
            await t.rollback()
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError)
        }

        res.status(500).json({ error: "Server error" })
    }
}

export async function getTasks(req, res) {
    const { mainKey } = req.params
    const { user } = req
    
    try {
        const items = user.items ? user.items : []
        res.render("index", { linkRoot, tasks: items, currentUrl: `/${mainKey}` })
    } catch (error) {
        console.error("Error retrieving tasks:", error)
        res.status(500).json({ error: "Server error" })
    }
}

export function getTask(req, res) {
    res.json(req.item)
}

export async function updateTask(req, res) {
    try {
        req.item.status = req.item.status === 0 ? 1 : 0
        await req.item.save()

        res.json(req.item)
    } catch (error) {
        console.error("Error updating task:", error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function deleteTask(req, res) {
    try {
        await req.item.destroy()
        res.sendStatus(200)
    } catch (error) {
        console.error("Error deleting task:", error)
        res.status(500).json({ error: "Server error" })
    }
}

export function renderHome(req, res) {
    res.render("index", { linkRoot, tasks: [], currentUrl: `/`, title: "To-Do App" })
}

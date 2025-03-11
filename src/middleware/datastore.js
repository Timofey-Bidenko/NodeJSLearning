import User from "../models/user.model.js"
import Item from "../models/item.model.js"

async function updateUserLastActiveAt(user) {
    let attempts = 0
    user.lastActiveAt = Date.now()
    while (attempts < 3) {
        attempts++
        
        try {
            await user.save()
            attempts = 999
            return
        } catch (error) {
            console.error(`Attempt ${attempts} failed:`, error)
        }
    }
}

export async function ensureMainKey(req, res, next) {
    const { mainKey, itemId } = req.params

    let retrievalParams = { where: { mainKey } }

    if (req.retrieveUserWithItems && req.retrieveUserWithItems === true) {
        retrievalParams = {
            where: { mainKey },
            include: { model: Item, as: "items" } 
        }

        if (itemId) { // instead of findItem
            retrievalParams.include = {
                model: Item,
                as: "items",
                where: { id: itemId },
                required: false,
            }
        }
    }

    try {
        const user = await User.findOne(retrievalParams)

        req.UserIsNew = !user
        if (user) {
            await updateUserLastActiveAt(user)
            req.user = user
        }

        next()
    } catch (error) {
        console.error("Error checking user:", error)
        res.sendStatus(500)
    }
}

export async function findItem(req, res, next) {
    const { user } = req

    try {
        if (!user.items || !user.items.length || !user.items[0]) return res.status(404).json({ error: "User was just created!" })
        
        req.item = user.items[0]
        next()
    } catch (error) {
        console.error("Error finding item:", error)
        res.sendStatus(500)
    }
}
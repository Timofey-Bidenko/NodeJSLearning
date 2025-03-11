import wait from "../../CustomModules/luauWait/index.js"
import User from "../models/user.model.js"
import { Op } from "sequelize"

async function clean() {
    // console.log("Cleaning. Timestamp:", Date.now())
    const threshold = new Date(Date.now() - 60 * 60 * 1000) // 7 days ago

    try {
        const deletedCount = await User.destroy({
            where: { lastactiveat: { [Op.lte]: threshold } }
        })
        // console.log(deletedCount)
        if (deletedCount) console.log(`Deleted data of ${deletedCount} inactive users.`)
    } catch (error) {
        console.error("Error deleting inactive users:", error)
    }
}

export default async function() {
    while (await wait(1000 * 60)) { // attempts cleanup once per minute
        await clean()
    }
}
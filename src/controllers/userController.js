import { generateAccessToken, generateRefreshToken } from '../middleware/authentication.js'
import User from "../models/user.model.js"

export async function getUser(req, res, next) {
    const { mainKey } = req.params
    const { UserIsNew } = req

    if (UserIsNew) {
        try {
            const newUser = await User.create({ mainKey })

            req.user = newUser

            const accessToken = generateAccessToken({ mainKey })
            const refreshToken = generateRefreshToken({ mainKey })

            res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        } catch (error) {
            console.error("Error adding user:", error)
            return res.status(500).json({ error: "Server error" })
        }
    }
    
    next()
}
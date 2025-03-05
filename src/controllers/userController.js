import { generateAccessToken, generateRefreshToken } from '../middleware/authentication.js'
import { DS } from '../middleware/dataStore.js'

export function getUser(req, res, next) {
    const { mainKey } = req.body
    const { UserIsNew } = req

    if (UserIsNew) {
        const accessToken = generateAccessToken({ mainKey })
        const refreshToken = generateRefreshToken({ mainKey })

        DS[mainKey] = { localId: 0, items: [], lastActive: Date.now() }

        // Store tokens in httpOnly cookies
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    } else {
        try {
            DS[mainKey]["lastActive"] = Date.now()
        } catch {

        }
    }
    
    next()
}
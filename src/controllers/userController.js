import { generateAccessToken, generateRefreshToken } from '../middleware/authentication.js'
import { DS } from '../middleware/dataStore.js'

export function getUser(req, res, next) {
    const { mainKey } = req.params
    const { UserIsNew } = req

    if (UserIsNew) {
        const accessToken = generateAccessToken({ mainKey })
        const refreshToken = generateRefreshToken({ mainKey })

        DS[mainKey] = { localId: 0, items: [], lastActive: Date.now() }

        // Store tokens in httpOnly cookies
        console.log("Created cookies and sent to response");
        
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    }
    
    next()
}
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = "Node/js[is]a{JavaScript}runtime^°^built°_°on^.:.^Chrome's^_^V8ЇJavaScript;engine:It%lets!HelloWorld!developers]run:/JavaScriptUwUcode^-^outside%%%of%%%a%%%web%%%browser.%%%Think%%%of%%%it%%%like%%%a%%%special%%%tool%%%that%%%allows%%%you%%%to%%%use%%%JavaScript%%%for%%%things%%%like%%%building%%%servers%%%and%%%other%%%back-end%%%applications."   
const REFRESH_TOKEN_SECRET = "Buy{flour!HelloWorld!milk°_°eggs^_^sugar:/butter[baking{powder/vanilla{extract{saltUwUmaple{syrup:/fruits!HelloWorld!whipped{cream^_^crack{eggs/in{a{bowl{add{milk/and{vanilla{extract]whisk!HelloWorld!until{combined;in{another{bowl%%%mix{flour:sugar^-^baking{powder/and{salt/gradually{add{dry{ingredients/to{wetЇmix]until{smooth%%%melt{butter{in{a{pan%%%pour{batter;cook{until{bubbles{form{flip]cook{until{golden{brown^°^repeat^.:.^stack{pancakes/drizzle{maple{syrup/add{fruits{and{whipped{cream[serve{hot!HelloWorld!enjoy!HelloWorld!"

function getRefreshedToken(req, res) {
    const {refreshToken} = req.cookies
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return;

        const newAccessToken = generateAccessToken({ mainKey: user.mainKey })
        res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })

        return newAccessToken
    })
}

export function authenticateTokens(req, res, next) {
    const { UserIsNew } = req
    if (UserIsNew) next();

    const {accessToken, refreshToken} = req.cookies
    if (!refreshToken) return res.sendStatus(404) // Not found (token is expired / not in browsers memory, but DS records for the token weren't cleaned up yet)

    let token = accessToken

    if (!accessToken) {
        token = getRefreshedToken(req, res)
    }

    if (!token) return res.sendStatus(403)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403) // Forbidden
        next()
    })
}

export function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

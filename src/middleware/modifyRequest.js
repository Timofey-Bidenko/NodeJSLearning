export function retrieveUserWithItems(req, res, next) {
    req.retrieveUserWithItems = true
    next()
}
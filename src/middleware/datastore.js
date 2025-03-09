export const DS = {};

export function ensureMainKey(req, res, next) {
    const { mainKey } = req.params;
    req.UserIsNew = !DS[mainKey]
    /* if (!DS[mainKey]) {
        DS[mainKey] = { localId: 0, items: [] };
    } */
    next();
}

export function findItem(req, res, next) {
    const { mainKey, itemId } = req.params;
    req.item = DS[mainKey]?.items.find(i => i.id === parseInt(itemId));

    if (!req.item) return res.sendStatus(404);
    next();
}
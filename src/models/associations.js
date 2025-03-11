import User from "./user.model.js"
import Item from "./item.model.js"

User.hasMany(Item, { foreignKey: "mainKeyId", as: "items" })
Item.belongsTo(User, { foreignKey: "mainKeyId", as: "user" })
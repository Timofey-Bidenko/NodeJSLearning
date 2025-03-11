import { Sequelize, DataTypes, Model } from "sequelize"
import sequelize from "./index.js";

class User extends Model {}

User.init({
  mainKey: {
    type: DataTypes.TEXT,
    unique: true,
    field: "mainkey",
  },
  mainKeyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "mainkeyid",
  },  
  localID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: "localid",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    field: "createdat",
  },
  lastActiveAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    field: "lastactiveat",
  },
}, {
  sequelize,
  modelName: "User",
  tableName: "main",
  timestamps: false,
})

export default User

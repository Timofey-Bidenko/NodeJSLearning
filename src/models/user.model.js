import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

class User extends Model {}

User.init({
  mainKey: {
    type: DataTypes.TEXT,
    unique: true,
  },
  mainKeyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },  
  localID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  lastActiveAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  sequelize,
  modelName: "User",
  tableName: "main",
  timestamps: false, // since you're using explicit timestamps with custom columns
});

export default User;

import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

class Item extends Model {}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  mainKeyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'main',
      key: 'mainKeyId',
    },
    onDelete: 'CASCADE',
  },
  text: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 0,
    validate: {
      isIn: [[0, 1]], // Ensures status is either 0 or 1
    },
  },
}, {
  sequelize,
  modelName: "Item",
  tableName: "items",
  timestamps: false, // No createdAt or updatedAt fields
});

export default Item;

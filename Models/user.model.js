import { sequelize } from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeCreate: async (UserModel, options) => {
        UserModel.password = await createHash(UserModel.password);
      },
      beforeUpdate: async (UserModel, options) => {
        UserModel.password = await createHash(UserModel.password);
      },
    },
  }
);

const createHash = async (string) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(string, salt);
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

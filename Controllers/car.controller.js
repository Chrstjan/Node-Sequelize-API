import express from "express";
import { CarModel } from "../Models/car.model.js";
import { BrandModel } from "../Models/brand.model.js";
import { CategoryModel } from "../Models/category.model.js";

export const CarController = express.Router();

CarModel.belongsTo(BrandModel, {
  foreignKey: {
    allowNull: false,
  },
});

BrandModel.hasMany(CarModel);

CarModel.belongsTo(CategoryModel, {
  foreignKey: {
    allowNull: false,
  },
});

CategoryModel.hasMany(CarModel);

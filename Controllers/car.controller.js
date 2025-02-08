import express from "express";
import { CarModel } from "../Models/car.model.js";
import { BrandModel } from "../Models/brand.model.js";
import { CategoryModel } from "../Models/category.model.js";

export const carController = express.Router();

CarModel.belongsTo(BrandModel, {
  foreignKey: {
    allowNull: false,
  },
});

CarModel.belongsTo(CategoryModel, {
  foreignKey: {
    allowNull: false,
  },
});

CategoryModel.hasMany(CarModel);

carController.get("/cars", async (req, res) => {
  try {
    let cars = await CarModel.findAll({
      include: [
        { model: BrandModel, attributes: ["name", "logo"] },
        { model: CategoryModel, attributes: ["name", "id"] },
      ],
    });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.json(cars);
  } catch (err) {
    res.status(500).send({
      message: `Error i call from CarModel: ${err}`,
    });
  }
});

carController.post("/cars", async (req, res) => {
  let {
    model,
    color,
    year,
    price,
    fueltype,
    brand_id: brandId,
    category_id: categoryId,
  } = req.body;

  if (
    !model ||
    !color ||
    !year ||
    !price ||
    !fueltype ||
    !brandId ||
    !categoryId
  ) {
    return res.status(400).json({ message: "You must add all fields" });
  }

  try {
    const result = await CarModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(`Error in creating car, ${err}`);

    res.status(500).json({
      message: `Error in creation from CarModel: ${err.message}`,
    });
  }
});

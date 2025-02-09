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
        { model: CategoryModel, attributes: ["name"] },
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

carController.get("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await CarModel.findOne({
      where: { id: id },
      include: [
        {
          model: BrandModel,
          attributes: ["name", "logo"],
        },
        {
          model: CategoryModel,
          attributes: ["name"],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in call from CarModel: ${err.message}`,
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
    const result = await CarModel.create({
      model,
      color,
      year,
      price,
      fueltype,
      brandId,
      categoryId,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(`Error in creating car, ${err}`);

    res.status(500).json({
      message: `Error in creation from CarModel: ${err.message}`,
    });
  }
});

carController.put("/cars/:id([0-9]*)", async (req, res) => {
  const {
    model,
    color,
    year,
    price,
    fueltype,
    brand_id: brandId,
    category_id: categoryId,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await CarModel.update(
      { model, color, year, price, fueltype, brandId, categoryId },
      { where: { id } }
    );

    if (result[0] > 0) {
      res.status(200).json({
        message: `Car updated`,
      });
    } else {
      res.status(404).json({ message: `Car with the id ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in updating from CarModel: ${err.message}`,
    });
  }
});

carController.delete("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await CarModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({
        message: `Car deleted`,
      });
    } else {
      res.status(404).json({ message: `Car with the id ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in deleting from CarModel: ${err.message}`,
    });
  }
});

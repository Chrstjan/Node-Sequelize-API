import express from "express";
import { BrandModel } from "../Models/brand.model.js";
import { where } from "sequelize";

export const brandController = express.Router();

brandController.get("/brands", async (req, res) => {
  try {
    let brands = await BrandModel.findAll();

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }
    res.json(brands);
  } catch (err) {
    res.status(500).send({
      message: `Error i call from BrandModel: ${err}`,
    });
  }
});

brandController.get("/brands/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await BrandModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Brand with the ${id} not found` });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error i call from BrandModel: ${err.message}`,
    });
  }
});

brandController.post("/brands", async (req, res) => {
  const { name, logo } = req.body;

  if (!name || !logo) {
    return res.status(400).json({ message: "You must add both name and logo" });
  }

  try {
    const result = await BrandModel.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.error(`Error in creating brand, ${err}`);

    res
      .status(500)
      .json({ message: `Error in creation from BrandModel: ${err.message}` });
  }
});

brandController.put("/brands", async (req, res) => {
  const { id, name, logo } = req.body;

  if (id && name) {
    try {
      const result = await BrandModel.update({ name, logo }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Brand updated`,
        });
      } else {
        res.status(404).json({ message: `Brand with the id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error in updating from BrandModel: ${err.message}`,
      });
    }
  }
});

brandController.delete("/brands", async (req, res) => {
  const { id } = req.body;

  if (id) {
    try {
      const result = await BrandModel.destroy({ where: { id } });
      res.status(200).json({
        message: `Brand deleted`,
      });
    } catch (err) {
      res.status(404).json({ message: `Brand with the id ${id} not found` });
    }
  } else {
    res.status(500).json({
      message: `Error in deleting from BrandModel. Id not found: ${err.message}`,
    });
  }
});

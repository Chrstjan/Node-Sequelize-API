import express from "express";
import { CategoryModel } from "../Models/category.model.js";

export const categoryController = express.Router();

categoryController.get("/category", async (req, res) => {
  try {
    let categories = await CategoryModel.findAll();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.json(categories);
  } catch (err) {
    res.status(500).send({
      message: `Error i call from CategoryModel: ${err}`,
    });
  }
});

categoryController.get("/category/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await CategoryModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Category with the ${id} not found` });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in call from CategoryModel: ${err.message}`,
    });
  }
});

categoryController.post("/category", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "You must add a name" });
  }

  try {
    const result = await CategoryModel.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.error(`Error in creating category, ${err}`);

    res.status(500).json({
      message: `Error in creation from CategoryModel: ${err.message}`,
    });
  }
});

categoryController.put("/category", async (req, res) => {
  const { id, name } = req.body;

  if (id && name) {
    try {
      const result = await CategoryModel.update({ name }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Category updated`,
        });
      } else {
        res
          .status(404)
          .json({ message: `Category with the id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error in updating from CategoryModel: ${err.message}`,
      });
    }
  }
});

categoryController.delete("/category/:id([0-9]*)", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    let result = await CategoryModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({
        message: `Category deleted`,
      });
    } else {
      res.status(404).json({ message: `Category with the id ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in deleting from CategoryModel: ${err.message}`,
    });
  }
});

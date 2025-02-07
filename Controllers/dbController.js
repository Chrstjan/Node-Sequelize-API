import express from "express";
import sequelize from "../Config/sequelize.config.js";
import { CarModel } from "../Models/car.model.js";
import { BrandModel } from "../Models/brand.model.js";
import { CategoryModel } from "../Models/category.model.js";

export const dbController = express.Router();

dbController.get("/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection to server");
    res.send("Connection to database");
  } catch (err) {
    console.error(`Error, could not find database ${err}`);
    res.status(500).send("Error, could not find database");
  }
});

dbController.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync();
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});

export default dbController;

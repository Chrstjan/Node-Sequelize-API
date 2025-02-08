import express from "express";
import dotenv from "dotenv";
import dbController from "./Controllers/db.controller.js";
import { brandController } from "./Controllers/brand.controller.js";
import { categoryController } from "./Controllers/category.controller.js";
import { carController } from "./Controllers/car.controller.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(dbController, brandController, categoryController, carController);

app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});

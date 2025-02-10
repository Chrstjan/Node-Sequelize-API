import express from "express";
import { UserModel } from "../Models/user.model.js";

export const userController = express.Router();

userController.get("/users", async (req, res) => {
  try {
    let users = await UserModel.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).send({
      message: `Error i call from CategoryModel: ${err}`,
    });
  }
});

userController.get("/users/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await UserModel.findOne({
      where: { id: id },
    });
    if (!result) {
      return res.status(404).json({ message: `User with the ${id} not found` });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Error in call from UserModel: ${err.message}`,
    });
  }
});

userController.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "You must add all fields" });
  }

  try {
    const result = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(`Error in creating user, ${err}`);

    res.status(500).json({
      message: `Error in creation from UserModel: ${err.message}`,
    });
  }
});

userController.put("/users", async (req, res) => {
  const { id, firstname, lastname, email, password } = req.body;

  if (id && firstname && lastname && email && password) {
    try {
      const result = await UserModel.update(
        { firstname, lastname, email, password },
        { where: { id } }
      );

      if (result[0] > 0) {
        res.status(200).json({
          message: `User updated`,
        });
      } else {
        res.status(404).json({ message: `User with the id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({
        message: `Error in updating from UserModel: ${err.message}`,
      });
    }
  }
});

userController.delete("/users/id:([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await UserModel.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({
        message: `User deleted`,
      });
    } else {
      res.status(404).json({ message: `User with the id ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error in deleting from CategoryModel: ${err.message}`,
    });
  }
});

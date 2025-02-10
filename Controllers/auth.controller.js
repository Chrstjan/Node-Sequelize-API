import express from "express";
import { Authenticate, Authorize } from "../Utils/authUtils.js";

export const authController = express.Router();

authController.post("/login", async (req, res) => {
  Authenticate(req, res);
});

authController.get("/authorize", Authorize, (req, res, next) => {
  res.send({ message: "You are logged in" });
});

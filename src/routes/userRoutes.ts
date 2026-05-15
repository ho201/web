import express from "express";
import { UserController } from "../Contraller/userContraller.js";
import { authMiddleware } from "../middlewore/authMiddlewore.js";

export const userRoutes = express.Router();

userRoutes.get("/me",authMiddleware,UserController.getProfile);

userRoutes.get("/:id",authMiddleware,UserController.getUser);

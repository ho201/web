import express from "express";
import {register, login} from "../Contraller/authContraller.js";
import {registerValidation, loginValidation} from "../validation/authValidation.js";
import { validate } from "../middlewore/validateMiddlewore.js";

export const authRoutes = express.Router();

authRoutes.post("/register",registerValidation,validate,register);

authRoutes.post("/login",loginValidation,validate,login);



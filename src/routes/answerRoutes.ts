import express from "express";
import { AnswerController } from "../Contraller/answerContraller.js";
import { authMiddleware } from "../middlewore/authMiddlewore.js";
import { validate } from "../middlewore/validateMiddlewore.js";
import { submitAnswerValidation } from "../validation/answerValidation.js";
export const answerRoutes = express.Router();

answerRoutes.post("/submit",authMiddleware,submitAnswerValidation,validate,AnswerController.submitAnswer);


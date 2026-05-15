import express from "express";
import { QuestionController } from "../Contraller/questionContraller.js";
import { authMiddleware } from "../middlewore/authMiddlewore.js";
import { examinerOnly } from "../middlewore/roleMiddlewore.js";
import { validate } from "../middlewore/validateMiddlewore.js";
import { createQuestionValidation } from "../validation/questionValidation.js";

export const questionRoutes = express.Router();

questionRoutes.post("/",authMiddleware,examinerOnly,createQuestionValidation,validate,QuestionController.createQuestion);

questionRoutes.get("/exam/:examId",authMiddleware,QuestionController.getByExam);

questionRoutes.get("/:id",authMiddleware,QuestionController.getQuestionById);


import express from "express";
import { ExamController } from "../Contraller/examContraller.js";
import { authMiddleware } from "../middlewore/authMiddlewore.js";
import { examinerOnly } from "../middlewore/roleMiddlewore.js";
import { createExamValidation } from "../validation/examValidation.js";
import { validate } from "../middlewore/validateMiddlewore.js";

export const examRoutes = express.Router();

examRoutes.post("/",authMiddleware,examinerOnly,createExamValidation,validate,ExamController.createExam);

examRoutes.get("/creator/:creatorId",authMiddleware,examinerOnly,ExamController.getByCreator);

examRoutes.get("/:id",authMiddleware,ExamController.getExam);



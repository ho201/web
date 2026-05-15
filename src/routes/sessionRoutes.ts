import express from "express";
import { SessionController } from "../Contraller/sessionContraller.js";
import { authMiddleware } from "../middlewore/authMiddlewore.js";
import { examinerOnly } from "../middlewore/roleMiddlewore.js";

export const sessionRoutes = express.Router();

sessionRoutes.post("/start",authMiddleware,examinerOnly,SessionController.startSession);

sessionRoutes.post("/next",authMiddleware,examinerOnly,SessionController.nextQuestion);

sessionRoutes.post("/finish",authMiddleware,examinerOnly,SessionController.finishSession);

sessionRoutes.get("/:sessionId",authMiddleware,SessionController.getSession);


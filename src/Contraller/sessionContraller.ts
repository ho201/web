
import type { Request, Response } from "express";

import { SessionRepo } from "../repositories/sessionRepository.js";

export const SessionController = {

    async startSession(req: Request, res: Response) {

        try {

            const { examId, firstQuestionId } = req.body;

            const sessionId = await SessionRepo.start(
                examId,
                firstQuestionId
            );

            res.status(201).json({
                message: "Session started",
                sessionId
            });

        } catch (err) {

            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async nextQuestion(req: Request, res: Response) {

        try {

            const { sessionId, questionId } = req.body;

            await SessionRepo.nextQuestion(
                sessionId,
                questionId
            );

            res.json({
                message: "Moved to next question"
            });

        } catch (err) {

            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async finishSession(req: Request, res: Response) {

        try {

            const { sessionId } = req.body;

            res.json({
                message: "Session finished",
                sessionId
            });

        } catch (err) {

            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async getSession(req: Request, res: Response) {

        try {

            const { sessionId } = req.params;

            const session = await SessionRepo.getSession(
                Number(sessionId)
            );

            if (!session) {

                return res.status(404).json({
                    message: "Session not found"
                });
            }

            res.json(session);

        } catch (err) {

            res.status(500).json({
                error: (err as any).message
            });
        }
    }
};


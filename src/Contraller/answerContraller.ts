import type { Request, Response } from "express";
import { AnswerRepo } from "../repositories/answerRepository.js";

export const AnswerController = {

    async submitAnswer(req: Request, res: Response) {

        try {
            const {
                question_id,
                answer_text,
                session_id
            } = req.body;

            const studentId = (req as any).user.id;

            const answerId = await AnswerRepo.submitText(
                studentId,
                question_id,
                answer_text,
                session_id
            );

            res.status(201).json({
                message: "Answer submitted",
                answerId
            });

        } catch (err: any) {

            res.status(500).json({
                error: err.message
            });
        }
    }
};




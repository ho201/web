import type { Request, Response } from "express";
import { QuestionRepo } from "../repositories/questionRepository.js";

export const QuestionController = {

    async createQuestion(req: Request, res: Response) {
        try {
            const {question_text,type,score,order_index,time_limit,exam_id} = req.body;
            const questionId = await QuestionRepo.create({
                question_text,
                type,
                score,
                order_index,
                time_limit,
                exam_id
            });
            res.status(201).json({
                message: "Question created",
                questionId
            });
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async getByExam(req: Request, res: Response) {

        try {
            const { examId } = req.params;
            const questions = await QuestionRepo.getByExam(
                Number(examId)
            );
            res.json(questions);
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    },
    async getQuestionById(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const question = await QuestionRepo.getById(
                Number(id)
            );
            if (!question) {
                return res.status(404).json({
                    message: "Question not found"
                });
            }
            res.json(question);
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    }
};


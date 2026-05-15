import type { Request, Response } from "express";
import { ExamRepo } from "../repositories/examRepository.js";

export const ExamController = {

    async createExam(req: Request, res: Response) {
        try {
            const { title } = req.body;
            const created_by = (req as any).user.id;
            const examId = await ExamRepo.create(
                title,
                created_by
            );
            res.status(201).json({
                message: "Exam created",
                examId
            });
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async getExam(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exam = await ExamRepo.getById(Number(id));
            if (!exam) {
                return res.status(404).json({ message: "Exam not found" });
            }
            res.json(exam);
        } 
        catch (err) {
            res.status(500).json({ error: (err as any).message });
        }
    },

    async getByCreator(req: Request, res: Response) {

        try {
            const { creatorId } = req.params;
            const exams = await ExamRepo.getByCreator(Number(creatorId));
            res.json(exams);
        } catch (err) {
            res.status(500).json({ error: (err as any).message });
        }
    }
};
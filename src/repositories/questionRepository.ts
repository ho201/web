import { db } from "../db/db.js";

export const QuestionRepo = {

    async create(data: {
        question_text: string;
        type: string;
        score: number;
        order_index: number;
        time_limit?: number;
        exam_id: number;
    }): Promise<number> {

        const [res] = await db.query(
            `INSERT INTO Questions 
            (question_text, type, score, order_index, time_limit, Exam_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.question_text,
                data.type,
                data.score,
                data.order_index,
                data.time_limit ?? null,
                data.exam_id
            ]
        );

        return (res as any).insertId;
    },

    async getByExam(examId: number) {

        const [rows] = await db.query(
            `SELECT * FROM Questions WHERE Exam_id = ? ORDER BY order_index`,
            [examId]
        );

        return rows as any[];
    },

    async getById(id: number) {

        const [rows] = await db.query(
            `SELECT * FROM Questions WHERE id = ?`,
            [id]
        );

        return (rows as any[])[0];
    }
};


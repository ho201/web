import { db } from "../db/db.js";

export const SessionRepo = {

    async start(examId: number, firstQuestionId: number): Promise<number> {
        const [res] = await db.query(
            "INSERT INTO exam_sessions (Exam_id, current_question_id) VALUES (?, ?)",
            [examId, firstQuestionId]
        );

        return (res as any).insertId;
    },

    async nextQuestion(sessionId: number, questionId: number): Promise<void> {
        await db.query(
            "UPDATE exam_sessions SET current_question_id = ? WHERE id = ?",
            [questionId, sessionId]
        );
    },

    async getSession(sessionId: number) {
        const [rows] = await db.query(
            "SELECT * FROM exam_sessions WHERE id = ?",
            [sessionId]
        );

        return (rows as any[])[0];
    }
};
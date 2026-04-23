import { db } from "../db/db.js";

export const SessionRepo = {

    async start(examId, firstQuestionId) {
        const [res] = await db.query(
        "INSERT INTO exam_sessions (Exam_id, current_question_id) VALUES (?, ?)",
        [examId, firstQuestionId]
        );
        return res.insertId;
    },

    async nextQuestion(sessionId, questionId) {
        await db.query(
        "UPDATE exam_sessions SET current_question_id = ? WHERE id = ?",
        [questionId, sessionId]
        );
    },

    async getSession(sessionId) {
        const [rows] = await db.query(
        "SELECT * FROM exam_sessions WHERE id = ?",
        [sessionId]
        );
        return rows[0];
    }
};
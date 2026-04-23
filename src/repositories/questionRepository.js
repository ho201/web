import { db } from "../db/db.js";

export const QuestionRepo = {

    async getByExam(examId) {
        const [rows] = await db.query(
        "SELECT * FROM Questions WHERE Exam_id = ? ORDER BY order_index",
        [examId]
        );
        return rows;
    }
};
import { db } from "../db/db.js";

export const AnswerRepo = {

    async submitText(studentId, questionId, text) {
        const [res] = await db.query(
        "INSERT INTO answers (student_id, question_id, answer_text) VALUES (?, ?, ?)",
        [studentId, questionId, text]
        );
        return res.insertId;
    }
};
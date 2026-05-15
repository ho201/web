import { db } from "../db/db.js";

export const AnswerRepo = {
    async submitText(studentId: number,questionId: number,text: string,sessionId: number) {
        const [res] = await db.query(
            `INSERT INTO answers 
            (student_id, question_id, answer_text, exam_attempts_id)
            VALUES (?, ?, ?, ?)`,
            [
                studentId,
                questionId,
                text,
                sessionId
            ]
        );

        return (res as any).insertId;
    }
};


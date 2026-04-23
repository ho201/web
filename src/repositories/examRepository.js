import { db } from "../db/db.js";

export const ExamRepo = {

  // Create Exam
    async create(title, created_by) {
        const [result] = await db.query(
        "INSERT INTO Exams (title, Created_by) VALUES (?, ?)",
        [title, created_by]
        );
        return result.insertId;
    },

    // Get exam by id
    async getById(id) {
        const [rows] = await db.query(
        "SELECT * FROM Exams WHERE id = ?",
        [id]
        );
        return rows[0];
    },

    // Get exams by examiner
    async getByCreator(creatorId) {
        const [rows] = await db.query(
        "SELECT * FROM Exams WHERE Created_by = ?",
        [creatorId]
        );
        return rows;
    }
};
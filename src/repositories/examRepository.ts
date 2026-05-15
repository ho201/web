import { db } from "../db/db.js";

export const ExamRepo = {

    async create(title: string, created_by: number): Promise<number> {
        const [result] = await db.query(
            "INSERT INTO Exams (title, Created_by) VALUES (?, ?)",
            [title, created_by]
        );

        return (result as any).insertId;
    },

    async getById(id: number) {
        const [rows] = await db.query(
            "SELECT * FROM Exams WHERE id = ?",
            [id]
        );

        return (rows as any[])[0];
    },

    async getByCreator(creatorId: number) {
        const [rows] = await db.query(
            "SELECT * FROM Exams WHERE Created_by = ?",
            [creatorId]
        );

        return rows as any[];
    }
};
import { db } from "../db/db.js";

export const UserRepo = {

    async create(name: string, role: string): Promise<number> {
        const [res] = await db.query(
            "INSERT INTO Users (name, role) VALUES (?, ?)",
            [name, role]
        );

        return (res as any).insertId;
    },

    async getById(id: number) {
        const [rows] = await db.query(
            "SELECT * FROM Users WHERE id = ?",
            [id]
        );

        return (rows as any[])[0];
    }
};
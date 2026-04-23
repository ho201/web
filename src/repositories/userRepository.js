import { db } from "../db/db.js";

export const UserRepo = {
    
    async create(name, role) {
        const [res] = await db.query(
        "INSERT INTO Users (name, role) VALUES (?, ?)",
        [name, role]
        );
        return res.insertId;
    },

    async getById(id) {
        const [rows] = await db.query(
        "SELECT * FROM Users WHERE id = ?",
        [id]
        );
        return rows[0];
    }
};
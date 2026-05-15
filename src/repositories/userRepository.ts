import { db } from "../db/db.js";

export const UserRepo = {

    async create(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<number> {
        const [res] = await db.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, password, role]
        );
        return (res as any).insertId;
    },

    async getById(id: number) {
        const [rows]: any = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    async findByEmail(email: string) {
        const [rows]: any = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows[0];
    }
};
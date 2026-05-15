import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";
import { db } from "../db/db.js";

export const register = async (req: Request, res: Response) => {

    const {name, email, password, role} = req.body;
    try {
        const [users]: any = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (users.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );
        return res.status(201).json({
            message: "User created"
        });
    }
    catch (err: any) {
        console.log("ERROR => ", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;
    try {
        const [users]: any = await db.query("SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (users.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = generateToken({
            id: user.id,
            role: user.role
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        });
        return res.status(200).json({
            message: "Login success"
        });
    } 

    catch (err: any) {
        console.log("ERROR => ", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
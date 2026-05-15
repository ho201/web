import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";
import { UserRepo } from "../repositories/userRepository.js";


export const register = async(req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await UserRepo.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepo.create(
            name,
            email,
            hashedPassword,
            role
        );
        return res.status(201).json({
            message: "User created"
        });
    } 
    catch (err: any) {
        console.log("ERROR", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export const login = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepo.findByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
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
        console.log("ERROR", err);
        return res.status(500).json({
            message: "Server error",
        error: err.message
        });
    }
}
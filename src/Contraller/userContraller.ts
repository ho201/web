import type { Request, Response } from "express";
import { UserRepo } from "../repositories/userRepository.js";

export const UserController = {

    async createUser(req: Request, res: Response) {
        try {
            const { name, role } = req.body;
            const userId = await UserRepo.create(
                name,
                role
            );
            res.status(201).json({
                message: "User created successfully",
                userId
            });
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserRepo.getById(
                Number(id)
            );
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.json(user);
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    },
    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await UserRepo.getById(
                userId
            );
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.json(user);
        } 
        catch (err) {
            res.status(500).json({
                error: (err as any).message
            });
        }
    }
};


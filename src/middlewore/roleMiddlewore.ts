import type { Request, Response, NextFunction } from "express";

export const examinerOnly = (req: any, res: Response, next: NextFunction) => {

    if (req.user.role !== "examiner") {

        return res.status(403).json({
            message: "Forbidden"
        });
    }

    next();
};
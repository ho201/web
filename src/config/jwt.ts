import jwt from "jsonwebtoken";
import {env} from "../config/env.js";

export interface jwtPayload{
    id: number;
    role: string;
}

export const generateToken = (Payload: jwtPayload) => {
    return jwt.sign(Payload, env.jwt_secret, {expiresIn: "7d"});
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.jwt_secret) as jwtPayload;
};


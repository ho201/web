import { body } from "express-validator";

export const registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars"),

    body("name")
        .notEmpty()
        .withMessage("Name is required")
];

export const loginValidation = [

    body("email")
        .isEmail(),

    body("password")
        .notEmpty()
];
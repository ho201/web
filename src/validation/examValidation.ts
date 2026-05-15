import { body } from "express-validator";

export const createExamValidation = [

    body("title")
        .notEmpty()
];
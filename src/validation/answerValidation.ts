import { body } from "express-validator";

export const submitAnswerValidation = [

    body("question_id")
        .isInt(),

    body("answer_text")
        .notEmpty()
];
import { body } from "express-validator";

export const createQuestionValidation = [

    body("question_text")
        .notEmpty(),

    body("type")
        .isIn([
        "mcq",
        "multi_mcq",
        "matching",
        "complete",
        "text"
    ]),

    body("score")
        .isInt(),

    body("time_limit")
        .optional()
        .isInt(),
    body("exam_id")
        .isInt()
];
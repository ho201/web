export class Answer {
    constructor(id, student_id, question_id, answer_text, created_at) {
        this.id = id;
        this.student_id = student_id;
        this.question_id = question_id;
        this.answer_text = answer_text;
        this.created_at = created_at;
    }
}
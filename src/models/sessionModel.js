export class Session {
    constructor(id, exam_id, current_question_id, status) {
        this.id = id;
        this.exam_id = exam_id;
        this.current_question_id = current_question_id;
        this.status = status;
    }
}
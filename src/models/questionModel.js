export class Question {
    constructor(id, text, type, score, order_index, time_limit, exam_id) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.score = score;
        this.order_index = order_index;
        this.time_limit = time_limit;
        this.exam_id = exam_id;
    }
}
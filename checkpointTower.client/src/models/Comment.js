export class Comment {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.isAttending = data.isAttending || false
        this.body = data.body
    }
}
// let data = {
//     body: { type: String, required: true, maxLength: 500, minLength: 3 },
//     isAttending: { type: Boolean, required: true, default: true },
//     creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
//     eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' }
// }
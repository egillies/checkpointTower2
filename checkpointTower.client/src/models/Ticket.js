export class Ticket {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
    }
}
// let data = {
// eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
// accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
// }
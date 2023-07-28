export class TowerEvent {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCanceled = data.isCanceled || false
        this.coverImg = data.coverImg
        this.type = data.type

    }
}

// let data = {
//     name: { type: String, required: true, maxLength: 100, minLength: 3 },
//     description: { type: String, required: true, maxLength: 1000, minLength: 3 },
//     location: { type: String, required: true, maxLength: 100, minLength: 3 },
//     capacity: { type: Number, required: true, min: 0 },
//     startDate: { type: Date, required: true },
//     isCanceled: { type: Boolean, default: false },
//     coverImg: { type: String, required: true, maxLength: 250, minLength: 3 },
//     type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'convention' },
//     creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

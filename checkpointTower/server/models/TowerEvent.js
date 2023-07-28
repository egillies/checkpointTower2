import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    name: { type: String, required: true, maxLength: 100, minLength: 3 },
    description: { type: String, required: true, maxLength: 1000, minLength: 3 },
    location: { type: String, required: true, maxLength: 100, minLength: 3 },
    capacity: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    coverImg: { type: String, required: true, maxLength: 250, minLength: 3 },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'convention' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

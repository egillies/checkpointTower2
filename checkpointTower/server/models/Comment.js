import { Schema } from "mongoose";

export const CommentsSchema = new Schema({
    body: { type: String, required: true, maxLength: 500, minLength: 3 },
    isAttending: { type: Boolean, required: true, default: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
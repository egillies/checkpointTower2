import { Schema } from "mongoose";

export const TicketsSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketsSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TicketsSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'TowerEvent'
})
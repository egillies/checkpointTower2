import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TowerEventsService {
    async createTowerEvent(towerEventData) {
        const newTowerEvent = await dbContext.TowerEvents.create(towerEventData)
        await newTowerEvent.populate('creator')
        return newTowerEvent
    }
    async getTowerEvents() {
        // FIXME add the ticketCount virtual to be populated
        const towerEvents = await dbContext.TowerEvents.find()
            .populate('creator')
        return towerEvents
    }
    async getTowerEventById(towerEventId) {
        // FIXME add the ticketCount virtual to be populated
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator')
        if (!towerEvent) {
            throw new BadRequest(`Event ${towerEventId} does not exist.`)
        }
        return towerEvent
    }
    async updateTowerEvent(towerEventId, userId, towerEventData) {
        const originalTowerEvent = await this.getTowerEventById(towerEventId)

        if (originalTowerEvent.creatorId.toString() != userId) {
            throw new Forbidden(`You are not the creator of ${originalTowerEvent.name}`)
        }

        // TODO check if the event has already been cancelled?
        if (originalTowerEvent.isCanceled == true) {
            throw new BadRequest(`Cannot edit event`)
        }

        originalTowerEvent.name = towerEventData.name || originalTowerEvent.name
        originalTowerEvent.description = towerEventData.description || originalTowerEvent.description
        originalTowerEvent.location = towerEventData.location || originalTowerEvent.location
        originalTowerEvent.capacity = towerEventData.capacity || originalTowerEvent.capacity
        originalTowerEvent.startDate = towerEventData.startDate || originalTowerEvent.startDate
        originalTowerEvent.type = towerEventData.type || originalTowerEvent.type

        let updatedEvent = await originalTowerEvent.save()

        return updatedEvent
    }

    async archiveTowerEvent(towerEventId, userId) {
        const towerEventToArchive = await this.getTowerEventById(towerEventId)
        if (towerEventToArchive.creatorId.toString() != userId) {
            throw new Forbidden(`You are not the creator of this event.`)
        }
        towerEventToArchive.isCanceled = true
        await towerEventToArchive.save()
        return towerEventToArchive
    }
}


export const towerEventsService = new TowerEventsService()

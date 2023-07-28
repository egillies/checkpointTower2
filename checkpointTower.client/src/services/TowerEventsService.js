import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerEventsService {

    async getTowerEvents() {
        const res = await api.get('api/events')
        logger.log('[GOT EVENTS]', res.data);

        const towerEvents = res.data.map(towerPojo => new TowerEvent(towerPojo))
        AppState.towerEvents = towerEvents
    }

    async getTowerEventsById(towerId) {
        const res = await api.get(`api/events/${towerId}`)
        logger.log('[GOT SINGLE EVENT]', res.data);
        const towerEvent = new TowerEvent(res.data)
        AppState.activeTowerEvent = towerEvent
    }

    async createTowerEvent(towerEventData) {
        const res = await api.post('api/events', towerEventData);
        logger.log(res.data);
        const towerEvent = new TowerEvent(res.data);
        AppState.towerEvents.unshift(towerEvent)
        return towerEvent
    }

    // async archiveTowerEvent(towerEventId)
}

export const towerEventsService = new TowerEventsService()
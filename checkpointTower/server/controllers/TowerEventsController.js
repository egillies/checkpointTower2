import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";
export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .get('/:eventId/tickets', this.getTicketsByTowerEventId)
            .get('/:eventId/comments', this.getCommentsByTowerEventId)

            //NOTE user must be logged in to perform these actions 
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.updateTowerEvent)
            .delete('/:eventId', this.archiveTowerEvent)
    }

    async createTowerEvent(req, res, next) {
        try {
            const towerEventData = req.body
            towerEventData.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async getTowerEvents(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getTowerEvents()
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
    async getTowerEventById(req, res, next) {
        try {
            const towerEventId = req.params.eventId
            const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async updateTowerEvent(req, res, next) {
        try {
            const towerEventId = req.params.eventId
            const userId = req.userInfo.id
            const towerEventData = req.body
            const updatedTowerEvent = await towerEventsService.updateTowerEvent(towerEventId, userId, towerEventData)
            return res.send(updatedTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async archiveTowerEvent(req, res, next) {
        try {
            const towerEventId = req.params.eventId
            const userId = req.userInfo.id
            const towerEvent = await towerEventsService.archiveTowerEvent(towerEventId, userId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByTowerEventId(req, res, next) {
        try {
            const towerEventId = req.params.eventId
            const tickets = await ticketsService.getTicketsByTowerEventId(towerEventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getCommentsByTowerEventId(req, res, next) {
        try {
            const towerEventId = req.params.eventId
            const comments = await commentsService.getCommentsByTowerEventId(towerEventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

}
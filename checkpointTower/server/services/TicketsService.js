import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class TicketsService {

    async createTicket(ticketData) {
        const towerEvent = await towerEventsService.getTowerEventById(ticketData.eventId)

        if (towerEvent.isCanceled == true) {
            throw new Forbidden(`${towerEvent.name} has been canceled`)
        }

        const newTicket = await dbContext.Tickets.create(ticketData)
        await newTicket.populate('profile', 'account')
        return newTicket
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }

    async getTicketsByTowerEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    }

    async deleteTicket(ticketId, userId) {
        const ticketToBeRemoved = await dbContext.Tickets.findById(ticketId)

        if (!ticketToBeRemoved) {
            throw new BadRequest(`${ticketId} not found.`)
        }

        if (ticketToBeRemoved.accountId != userId) {
            throw new Forbidden(`You cannot remove a ticket that is not yours`)
        }

        await ticketToBeRemoved.remove()
        return ticketToBeRemoved
    }
}


export const ticketsService = new TicketsService()

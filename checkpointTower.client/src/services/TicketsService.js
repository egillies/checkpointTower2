import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {

    async getTicketsByTowerEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING TICKETS]', res.data);
        AppState.tickets = res.data.map(d => new Ticket(d))
    }

    async createTicket(ticketData) {
        const res = await api.post('api/tickets', ticketData);
        logger.log('[CREATING TICKET]', res.data);

        AppState.tickets.push(new Ticket(res.data))
    }

    async removeTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('[REMOVING TICKET]', res.data)
        AppState.tickets = AppState.tickets.filter(c => c.id != ticketId)
    }

    async getMyTickets() {
        try {
            const res = await api.get('account/tickets')
            logger.log('[GET MY TICKETS]', res.data);
            AppState.myTickets = res.data.map(d => new Ticket(d))
        } catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }
}

export const ticketsService = new TicketsService()
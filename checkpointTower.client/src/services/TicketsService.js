import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
class TicketsService {

    async getTicketsByTowerEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING TICKETS]', res.data);
        AppState.tickets = res.data.map(d => new Ticket(d))
    }

    async createTicket(formData) {
        const res = await api.post('api/tickets', formData);
        logger.log('[CREATING TICKET]', res.data);
        const newTicket = new Ticket(res.data);
        AppState.tickets.unshift(newTicket)
    }
}

export const ticketsService = new TicketsService()
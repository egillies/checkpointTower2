import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
class CommentsService {

    async getCommentsByTowerEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[GETTING COMMENTS]', res.data);
        AppState.comments = res.data.map(d => new Comment(d))
    }
    async createComment(formData) {
        const res = await api.post('api/comments', formData)
        logger.log('[CREATING COMMENT]', res.data);
        const newComment = new Comment(res.data)
        AppState.comments.unshift(newComment)
    }

}

export const commentsService = new CommentsService()
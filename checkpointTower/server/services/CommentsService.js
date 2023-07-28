import { towerEventsService } from "./TowerEventsService.js"
import { Forbidden } from "../utils/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentsService {

    async createComment(commentData) {
        const towerEvent = await towerEventsService.getTowerEventById(commentData.eventId)

        if (towerEvent.isCanceled == true) {
            throw new Forbidden(`${towerEvent.name} has been deleted`)
        }
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

    async getCommentsByTowerEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator')
        return comments
    }

    async removeComment(commentData, commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)

        if (commentToDelete.creatorId.toString() != userId) {
            throw new Forbidden(`You didn't write ${commentToDelete.body}.`)
        }
        await commentToDelete.remove()

    }
}

export const commentsService = new CommentsService()
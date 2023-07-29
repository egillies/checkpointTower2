<template>
    <div v-if="towerEvent" class="container-fluid">
        <div class="row">
            <!--SECTION TowerEvent details-->

            <div class="text-danger" v-if="towerEvent.isCanceled">

                <!-- {{ towerEvent.isCanceled }} -->
                <h1>Sorry, this event has been canceled </h1>

            </div>

            <!-- TODO add a tag for sold out -->

            <!-- TODO add a tag for hasTicket -->

            <div class="col-3">
                <div class="d-flex justify-content-between align-items-start">
                    <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid">
                </div>
            </div>

            <div class="rounded p-1 light-shadow">
                <p class="fs-4 fw-bold">
                    {{ towerEvent?.name }}
                </p>
                <div class="">
                    <p>
                        Date: {{ new Date(towerEvent?.startDate).toLocaleDateString() }}
                    </p>
                    <p>
                        type: {{ towerEvent?.type }}
                    </p>
                    <p>
                        Capacity: {{ towerEvent?.capacity }}
                    </p>
                    <p class="fs-4">
                        {{ towerEvent?.description }}
                    </p>
                </div>

                <!-- FIXME add a conditional v-if for hasTicket or sold out -->

                <div class="d-flex pt-2">

                    <button v-if="!hasTicket" class="btn btn-success" @click="createTicket()">Get Tickets</button>

                    <button v-else class="btn btn-danger" @click="RemoveTicket()">Delete Ticket</button>
                </div>


                <div>
                    <div v-for="ticket in tickets" :key="ticket.id">
                        {{ ticket.profile?.name }}
                        <img class="profile-img" :src="ticket.profile?.imgUrl" alt="" />
                    </div>
                </div>

                <div v-for="comment in comments" :key="comment?.id">
                    {{ comment.body }}
                    {{ comment.profile?.name }}
                    <img class="profile-img" :src="comment.profile?.imgUrl" alt="" />
                    <button v-if="comment?.accountId == accountId" class="btn btn-danger" @click="removeComment()">Delete
                        Comment</button>
                </div>

                <div v-if="account?.id">

                    <div class="row">

                        <div class="col-6">

                            <form @submit.prevent="createComment()">

                                <div class="form-floating p-3">
                                    <input v-model="editable.body" required type="text" class="form-control" id="comment"
                                        placeholder="comment">
                                    <label for="comment">Comment</label>
                                </div>
                                <button @click="createComment()" v-if="account.id"
                                    class="btn btn-success fs-4">Comment</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="pt-3">
                    <button v-if="account?.id == towerEvent?.creatorId" :disabled="towerEvent.isCanceled == true"
                        class="btn btn-danger" @click="archiveTowerEvent()" type="button">
                        <i class="mdi mdi-close-circle text-dark">Cancel Event</i>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted, watchEffect, ref } from 'vue';
import { AppState } from '../AppState.js';
// import { TowerEvent } from '../models/TowerEvent.js';
import { logger } from '../utils/Logger.js';
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'


//NOTE these functions run on page load
export default {

    setup() {
        const editable = ref({})
        const route = useRoute()

        function setFormDefaults() {
            editable.value = {}
        }

        onMounted(() => {
            setFormDefaults()
        })

        async function getTowerEventsById(eventId) {
            try {
                await towerEventsService.getTowerEventsById(eventId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        async function getTicketsByTowerEventId() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getTicketsByTowerEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }

        async function getCommentsByTowerEventId() {
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByTowerEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }

        watchEffect(() => {
            getTowerEventsById(route.params.eventId)
            getTicketsByTowerEventId()
            getCommentsByTowerEventId()
        })

        return {
            editable,
            towerEvent: computed(() => AppState.activeTowerEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            hasTicket: computed(() => {
                return AppState.tickets.find(c => c.accountId == AppState.account.id)
            }),

            // TODO add a computed that checks to see if the event is soldout (a bit of math against the ticketCount and the capicity)
            async archiveTowerEvent() {
                try {
                    const wantsToArchive = await Pop.confirm()

                    if (!wantsToArchive) {
                        return
                    }

                    const towerEventId = route.params.eventId
                    await towerEventsService.archiveTowerEvent(towerEventId)
                } catch (error) {
                    Pop.error(error.message)
                }
            },

            async createTicket() {
                try {
                    logger.log('[CREATING TICKET]')
                    const activeTowerEventId = route.params.eventId
                    const ticketData = { eventId: activeTowerEventId }
                    await ticketsService.createTicket(ticketData)
                    AppState.myTickets.ticketCount++

                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message, '[ERROR CREATING TICKET]')
                }
            },

            async removeTicket() {
                try {
                    logger.log('[REMOVING TICKET]')
                    const ticketToRemove = AppState.tickets.find(c => c.accountId == AppState.account.id)
                    const ticketId = ticketToRemove.id
                    await ticketsService.removeTicket(ticketId)
                    AppState.myTickets.ticketCount--
                    // const ticketsRemaining = AppState.tickets.filter(t => t.)

                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message, '[ERROR REMOVING TICKET]')
                }
            },

            async createComment() {
                try {
                    const formData = editable.value
                    logger.log(formData, '[COMMENT CREATED]')
                    formData.eventId = route.params.eventId
                    await commentsService.createComment(formData)
                    editable.value = {}
                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message, '[ERROR CREATING COMMENT]')
                }
            },

            async removeComment() {
                try {
                    logger.log('[REMOVING COMMENT]')
                    const commentToRemove = AppState.comments.find(c => c.accountId == AppState.account.id)
                    const commentId = commentToRemove.id
                    await commentsService.removeComment(commentId)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message, '[ERROR REMOVING COMMENT]')
                }
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.profile-img {
    height: 10vh;
    width: 10vh;
    border-radius: 5px;
    box-shadow: 2px 2px white;
}
</style>
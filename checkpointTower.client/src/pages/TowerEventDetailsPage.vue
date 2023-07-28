<template>
    <div v-if="towerEvent" class="container-fluid">
        <div class="row">
            <!--SECTION TowerEvent details-->

            <div class="text-danger" v-if="towerEvent.isCanceled">{{ towerEvent.isCanceled }}</div>

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
                        Capicity: {{ towerEvent?.capacity }}
                    </p>
                    <p class="fs-4">
                        {{ towerEvent?.description }}
                    </p>
                </div>

                <!-- FIXME add a conditional v-if for hasTicket or sold out -->
                <div>
                    <button :disabled="towerEvent?.isCanceled == true" class="btn btn-success" @click="createTicket()">Get
                        Tickets</button>
                </div>


                <div>
                    <!-- FIXME add the user image -->
                    <div v-for="ticket in tickets" :key="ticket.id">
                        {{ ticket.profile.name }}
                    </div>
                </div>


                <div v-if="account?.id" class="col-6">
                    <!-- FIXME add the @submit -->
                    <form @submit.prevent="createComment()">
                        <label for="exampleInputEmail1" class="form-label"></label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Create a Comment</div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Attending</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>


            <div class="pt-3">
                <button v-if="account?.id == towerEvent?.creatorId" :disabled="towerEvent.isCanceled == true"
                    class="btn btn-danger" @click="archiveTowerEvent()" type="button">
                    <i class="mdi mdi-close-circle text-dark">Delete Event</i>
                </button>
            </div>
        </div>

    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';
import { logger } from '../utils/Logger.js';
import { ticketsService } from '../services/TicketsService.js'


//NOTE these functions run on page load
export default {

    setup() {
        const route = useRoute()

        async function getTowerEventsById(eventId) {
            try {
                const eventId = route.params.eventId
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

        // onMounted(()=>{

        // })

        watchEffect(() => {
            getTowerEventsById(route.params.eventId)
            getTicketsByTowerEventId()
            // archiveTowerEvent()
        })

        return {
            towerEvent: computed(() => AppState.activeTowerEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),

            // TODO add a computed that checks to see if your account is in the tickets hasTicket

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
                    // const ticketData = {}
                    // ticketData.eventId = eventId
                    const ticketData = { eventId: activeTowerEventId }
                    await ticketsService.createTicket(ticketData)

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
                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message, '[ERROR REMOVING TICKET]')
                }
            },

            async createComment() {
                try {
                    console.log('the create comment form')
                } catch (error) {
                    Pop.error(error)
                }
            }


        }
    }

}

</script>


<style lang="scss" scoped></style>
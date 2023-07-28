<template>
    <div v-if="towerEvent" class="container-fluid">
        <div class="row">
            <!--SECTION TowerEvent details-->
            <div class="col-3">
                <div class="d-flex justify-content-between align-items-start">
                    <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid">
                </div>
            </div>

            <div class="rounded p-1 light-shadow">
                <p class="fs-4 fw-bold">
                    {{ towerEvent?.name }}
                </p>
                <div class="d-flex align-items-start">

                    <p class="fs-4">
                        {{ towerEvent?.startDate }}
                        {{ towerEvent?.type }}
                        {{ towerEvent?.description }}
                    </p>
                </div>

                <div class="pt-3">
                    <button v-if="account?.id == towerEvent?.creatorId" :disabled="towerEvent.isCanceled == true"
                        class="btn btn-danger" @click="archiveTowerEvent()" type="button">
                        <i class="mdi mdi-close-circle text-dark">Delete Event</i>
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
            }
        }
    }

}

</script>


<style lang="scss" scoped></style>
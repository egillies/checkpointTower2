<template>
    <router-link :to="{ name: 'Event', params: { eventId: towerEventProp.id } }">
        <div class="rounded light-shadow mb-3">
            <img :src="towerEventProp.coverImg" :alt="towerEventProp.name" class="img-fluid">

            <div class="text-center" p-2>
                <h2> {{ towerEventProp.name }}</h2>
                <!-- <p> hosted by: {{ towerEventProp.creatorId }}</p> -->
                <p>
                    <i class="mdi mdi-account"></i>
                    <span>{{ towerEventProp.capacity }}</span>
                </p>

                <button v-if="route.name == 'Event' && account.id && account.id == towerEventProp?.creatorId"
                    @click="archiveTowerEvent()" class="btn btn-success ms-2" type="button">
                    <i class="mdi mdi-close-circle text-danger">Delete Event</i>
                </button>
            </div>

        </div>
    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';


export default {
    props: {
        towerEventProp: { type: TowerEvent, required: true }
    },
    setup() {
        const route = useRoute()
        return {
            route,
            account: computed(() => AppState.account),
            towerEvent: computed(() => AppState.activeTowerEvent),
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
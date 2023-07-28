<template>
    <router-link :to="{ name: 'Event', params: { eventId: towerEventProp.id } }">
        <div class="rounded light-shadow mb-3">
            <img :src="towerEventProp.coverImg" :alt="towerEventProp.name" class="img-fluid">

            <div class="text-center" p-2>
                <h2> {{ towerEventProp.name }}</h2>
                <div>
                    <i class="mdi mdi-account"></i>
                    <p>{{ towerEventProp.capacity }}</p>
                </div>

            </div>
        </div>

    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
// import Pop from '../utils/Pop.js';
// import { towerEventsService } from '../services/TowerEventsService.js';



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

        }
    }

}
</script>



<style lang="scss" scoped></style>
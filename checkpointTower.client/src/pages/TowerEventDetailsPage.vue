<template>
    <div class="container-fluid">
        <div class="row">
            <!--SECTION TowerEvent details-->
            <div v-if="towerEvent" class="col-3">
                <div class="d-flex justify-content-between align-items-start">
                    <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid">
                </div>
            </div>

            <div class="rounded bg-warning p-1 light-shadow">
                <p class="fs-4 fw-bold">
                    {{ towerEvent?.name }}
                </p>
                <p class="fs-4">
                    hosted by: {{ towerEvent?.creator?.name }}
                </p>
            </div>

            <div class="pt-3">
                <!--TODO disable or hide if user is not ticketholder or creator-->
                <button v-if="towerEvent?.creatorId == account.id">Add Event</button>

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


//NOTE these functions run on page load
export default {
    setup() {
        const route = useRoute()

        async function getTowerEventsById() {
            try {
                const towerId = route.params.eventId
                await towerEventsService.getTowerEventsById(towerId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        // onMounted(()=>{

        // })

        watchEffect(() => {
            getTowerEventsById()
        })

        return {
            towerEvent: computed(() => AppState.activeTowerEvent),
            account: computed(() => AppState.account),
        }
    }
}
</script>


<style lang="scss" scoped></style>
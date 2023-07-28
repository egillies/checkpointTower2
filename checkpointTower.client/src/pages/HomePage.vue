<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-12 bg-dark text-light">
        <h1>My Events</h1>
      </div>

      <!-- //NOTE TowerEvent card goes here-->
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-3">
        <TowerEventCard :towerEventProp="towerEvent" />
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEvents()
    })


    return {
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

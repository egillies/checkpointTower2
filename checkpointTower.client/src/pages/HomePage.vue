<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-12 bg-dark text-light">
        <h1>My Events</h1>
      </div>

      <!-- //NOTE TowerEvent card goes here-->
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-8">
            <div class="bg-secondary d-flex justify-content-around p-2 rounded">
              <button class="btn btn-outline-light" @click="filterBy = ''">All</button>
              <button class="btn btn-outline-light" @click="filterBy = 'concert'">Concerts</button>
              <button class="btn btn-outline-light" @click="filterBy = 'convention'">Conventions</button>
              <button class="btn btn-outline-light" @click="filterBy = 'sport'">Sports</button>
              <button class="btn btn-outline-light" @click="filterBy = 'digital'">Digital</button>
            </div>
          </div>
        </div>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-3">
        <TowerEventCard :towerEventProp="towerEvent" />
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {
    const filterBy = ref('')

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
      filterBy,
      towerEvents: computed(() => {
        if (filterBy.value == "") {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(a => a.type == filterBy.value)
        }
      }),
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

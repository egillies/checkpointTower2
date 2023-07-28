<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="col-6" v-for="t in myTickets" :key="t.id">
      <TowerEventCard :towerEventProp="t.event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import TowerEventCard from '../components/TowerEventCard.vue';
export default {
  setup() {
    onMounted(() => {
      getMyTickets();
    });
    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      myTickets: computed(() => AppState.myTickets),
      towerEvent: computed(() => AppState.towerEvents),
    };
  },
  components: { TowerEventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

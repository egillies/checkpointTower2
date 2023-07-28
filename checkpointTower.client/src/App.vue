<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->

  <ModalComponent id="createEventModal">
    <template #header>
      Create Event
    </template>

    <template #body>
      <TowerEventsForm />
    </template>

  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import TowerEventsForm from './components/TowerEventsForm.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, TowerEventsForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

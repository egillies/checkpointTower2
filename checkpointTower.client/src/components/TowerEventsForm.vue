<template>
    <form @submit.prevent="createTowerEvent()">
        <div class="mb-3">
            <label for="name" class="form-label">Title</label>
            <input v-model="editable.name" required type="text" class="form-control" id="name" placeholder="Name"
                maxlength="100" minlength="3">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">CoverImg</label>
            <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg" placeholder="CoverImg"
                maxlength="250" minlength="3">
        </div>
        <div class="mb-3">
            <label for="Description" class="form-label">Description</label>
            <input v-model="editable.description" required type="text" class="form-control" id="description"
                placeholder="Description" maxlength="1000" minlength="3">
        </div>
        <div class="mb-3">
            <label for="Location" class="form-label">Location</label>
            <input v-model="editable.location" required type="text" class="form-control" id="location"
                placeholder="location" maxlength="100" minlength="3">
        </div>
        <div class="mb-3">
            <label for="Capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
                placeholder="capacity" min="0">
        </div>
        <div class="mb-3">
            <label for="startDate" class="form-label">Date</label>
            <input v-model="editable.startDate" required type="date" class="form-control" id="startDate"
                placeholder="startDate" min="2023-01-01" max="2030-12-31">
        </div>

        <select v-model="editable.type" required class="form-select mb-3" aria-label="Default select example">
            <option selected disabled value="">type</option>
            <option v-for="type in categories" :key="type" :value="type">
                {{ type }}
            </option>
        </select>

        <div class="text-end">
            <button class="btn btn-success" type="submit">Submit</button>
        </div>
    </form>
</template>


<script>
import { towerEventsService } from '../services/TowerEventsService.js'
import { Modal } from 'bootstrap'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';



export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,
            categories: ['concert', 'convention', 'sport', 'digital'],
            async createTowerEvent() {
                try {
                    logger.log(editable.value, 'hello??')
                    const towerEventData = editable.value
                    const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#createEventModal').hide()
                    router.push({ name: 'TowerEvent', params: { eventId: towerEvent.id } })
                } catch (error) {
                    Pop.error
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>
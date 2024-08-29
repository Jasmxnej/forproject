<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/Service'
import { type Event } from '@/type'

const events = ref<Event[]>([])

async function fetchAllEvents() {
  try {
    const response = await EventService.getAllEvents()
    events.value = response
  } catch (error) {
    console.error('There was an error fetching events!', error)
    events.value = []
  }
}

onMounted(() => {
  fetchAllEvents()
})
</script>
<template>
  <h1>Olympic Medal Table</h1>

  <table class="medal-table">
    <thead>
      <tr>
        <th>Flag</th>
        <th>Country</th>
        <th>Gold</th>
        <th>Silver</th>
        <th>Bronze</th>
        <th>Total Medals</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="event in events" :key="event.id">
        <td><img :src="event.flag_url" alt="Flag" class="flag" /></td>
        <td>
          <RouterLink :to="{ name: 'list-view', params: { id: event.id } }">
            {{ event.name }}
          </RouterLink>
        </td>
        <td>{{ event.gold_medals || event.medals_by_sport?.until_2024?.total?.gold || 0 }}</td>
        <td>{{ event.silver_medals || event.medals_by_sport?.until_2024?.total?.silver || 0 }}</td>
        <td>{{ event.bronze_medals || event.medals_by_sport?.until_2024?.total?.bronze || 0 }}</td>
        <td>{{ event.total_medals }}</td>
      </tr>
    </tbody>
  </table>

  <div v-if="events.length === 0">
    <p>No countries available.</p>
  </div>
</template>
<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}

.medal-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto 20px;
  text-align: left;
}

.medal-table th,
.medal-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.medal-table th {
  background-color: #f2f2f2;
}

.flag {
  width: 50px;
  height: auto;
}
</style>

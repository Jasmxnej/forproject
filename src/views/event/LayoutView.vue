<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEventStore } from '@/stores/event';

const route = useRoute();
const countryId = route.params.id as string;
const eventStore = useEventStore();

const event = computed(() => eventStore.currentEvent || eventStore.getEventById(countryId));

onMounted(async () => {
  if (!event.value) {
    try {
      const fetchedEvent = await eventStore.getEventById(countryId);
      if (fetchedEvent) {
        eventStore.setEvent(fetchedEvent);
      } else {
        console.error(`Country with ID ${countryId} not found.`);
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }
});
</script>

<template>
  <div>
    <div v-if="event">
      <h1>{{ event.name }}</h1>
      <nav>
        <RouterLink :to="{ name: 'country-detail-view', params: { id: event.id } }">Country Detail</RouterLink> |
        <RouterLink :to="{ name: 'medal-detail-view', params: { id: event.id } }">Medal Detail</RouterLink>
      </nav>
      <RouterView v-if="event" :key="event.id" :event="event" />
    </div>
    <div v-else>
      <p>Country not found or failed to load.</p>
    </div>
    
  </div>
</template>

<style scoped>
nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  margin: 0 10px;
}

nav a:hover {
  text-decoration: underline;
}

</style>

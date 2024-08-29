<script setup lang="ts">
import { ref, onMounted, defineProps, watchEffect } from 'vue';
import { useEventStore } from '@/stores/event';
import { type Event } from '@/type';

const props = defineProps<{ page: number; pageSize: number }>();

const events = ref<Event[]>([]);
const eventStore = useEventStore();

function paginateData() {
  if (eventStore.events.length === 0) {
    return;
  }

  const start = (props.page - 1) * props.pageSize;
  const end = start + props.pageSize;
  events.value = eventStore.events.slice(start, end);
}

onMounted(async () => {
  if (eventStore.events.length === 0) {
    await eventStore;
  }
  paginateData();
});

watchEffect(() => {
  paginateData();
});
</script>

<template>
  <tbody>
    <tr v-for="event in events" :key="event.id" class="event-row">
      <td class="cell flag-cell">
        <img :src="event.flag_url" alt="Flag" class="flag-image" />
      </td>
      <td class="cell name-cell">
        <RouterLink
          :to="{ name: 'list-view', params: { id: event.id } }"
          class="event-link"
        >
          {{ event.name }}
        </RouterLink>
      </td>
      <td class="cell medal-cell">
        {{ event.medals_by_sport?.until_2024?.total?.gold || 0 }}
      </td>
      <td class="cell medal-cell">
        {{ event.medals_by_sport?.until_2024?.total?.silver || 0 }}
      </td>
      <td class="cell medal-cell">
        {{ event.medals_by_sport?.until_2024?.total?.bronze || 0 }}
      </td>
      <td class="cell medal-cell">{{ event.total_medals }}</td>
    </tr>
  </tbody>
</template>

<style scoped>
.event-row:hover {
  background-color: #f9fafb;
}

.cell {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
}

.flag-cell {
  text-align: center;
}

.flag-image {
  width: 3rem;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

.name-cell {
  text-align: center;
}

.event-link {
  color: #374151;
  text-decoration: none;
}

.event-link:hover {
  text-decoration: underline;
}

.medal-cell {
  text-align: center;
}
</style>

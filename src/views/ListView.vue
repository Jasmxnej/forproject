<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '@/stores/event';
import CountryContent from '@/components/CountryContent.vue';

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();

const pageSize = ref(Number(route.query.pageSize) || 5);
const page = ref(Number(route.query.page) || 1);
const totalEvents = ref(0);

const totalPages = computed(() => Math.ceil(totalEvents.value / pageSize.value));
const hasNextPage = computed(() => page.value < totalPages.value);
const hasPrevPage = computed(() => page.value > 1);

onMounted(async () => {
  if (!route.query.pageSize || !route.query.page) {
    router.replace({
      name: 'list-view',
      query: { pageSize: pageSize.value, page: page.value },
    });
  }
  await eventStore.fetchAllEvents();
  totalEvents.value = eventStore.events.length;
});

watch([pageSize, page], () => {
  router.push({
    name: 'list-view',
    query: { pageSize: pageSize.value, page: page.value },
  });
});

function updatePageSize(size: number) {
  pageSize.value = size;
  page.value = 1;
}

function changePage(newPage: number) {
  page.value = newPage;
}

</script>

<template>
  <h1 class="title">Olympic Medal Table</h1>

  <table class="medal-table">
    <thead>
      <tr class="header-row">
        <th class="cell flag-cell">Flag</th>
        <th class="cell country-cell">
          Country
          <select
            id="page-size"
            v-model="pageSize"
            @change="updatePageSize(pageSize)"
            class="page-size-selector"
          >
            <option v-for="n in [5, 10, 15, 20, 25, 30]" :key="n" :value="n">{{ n }}</option>
          </select>
        </th>
        <th class="cell">Gold</th>
        <th class="cell">Silver</th>
        <th class="cell">Bronze</th>
        <th class="cell">Total Medals</th>
      </tr>
    </thead>
    
    <CountryContent :page="page" :pageSize="pageSize" />
  </table>

  <div v-if="totalPages > 1" class="pagination">
    <RouterLink
      v-if="hasPrevPage"
      :to="{ name: 'list-view', query: { page: page - 1, pageSize: pageSize } }"
      @click.prevent="changePage(page - 1)"
      class="pagination-link"
    >
      &#60; Previous
    </RouterLink>
    <span class="pagination-info">Page {{ page }} of {{ totalPages }}</span>
    <RouterLink
      v-if="hasNextPage"
      :to="{ name: 'list-view', query: { page: page + 1, pageSize: pageSize } }"
      @click.prevent="changePage(page + 1)"
      class="pagination-link"
    >
      Next &#62;
    </RouterLink>
  </div>

  <div v-if="totalEvents === 0" class="no-events">
    <p>No countries available.</p>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.medal-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.header-row {
  background-color: #f3f4f6;
}

.cell {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  text-align: center;
}

.page-size-selector {
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 24rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
}

.pagination-link {
  color: #374151;
  text-decoration: none;
}

.pagination-link:hover {
  text-decoration: underline;
}

.pagination-info {
  font-weight: 600;
}

.no-events {
  text-align: center;
  color: #6b7280;
}
</style>

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
  <div class="p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Olympic Medal Table</h1>

    <table class="w-full border-collapse mb-6">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border text-center">Flag</th>
          <th class="px-4 py-2 border text-center">
            Country
            <select
              id="page-size"
              v-model="pageSize"
              @change="updatePageSize(pageSize)"
              class="ml-2 border rounded px-2 py-1"
            >
              <option v-for="n in [5, 10, 15, 20, 25, 30]" :key="n" :value="n">{{ n }}</option>
            </select>
          </th>
          <th class="px-4 py-2 border text-center">Gold</th>
          <th class="px-4 py-2 border text-center">Silver</th>
          <th class="px-4 py-2 border text-center">Bronze</th>
          <th class="px-4 py-2 border text-center">Total Medals</th>
        </tr>
      </thead>
      
      <CountryContent :page="page" :pageSize="pageSize" />
    </table>

    <div v-if="totalPages > 1" class="flex justify-between items-center max-w-lg mx-auto mb-6">
      <RouterLink
        v-if="hasPrevPage"
        :to="{ name: 'list-view', query: { page: page - 1, pageSize: pageSize } }"
        @click.prevent="changePage(page - 1)"
        class="text-gray-700 hover:underline"
      >
        &#60; Previous
      </RouterLink>
      <span class="font-semibold">Page {{ page }} of {{ totalPages }}</span>
      <RouterLink
        v-if="hasNextPage"
        :to="{ name: 'list-view', query: { page: page + 1, pageSize: pageSize } }"
        @click.prevent="changePage(page + 1)"
        class="text-gray-700 hover:underline"
      >
        Next &#62;
      </RouterLink>
    </div>

    <div v-if="totalEvents === 0" class="text-center text-gray-500">
      <p>No countries available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Event } from '@/type';

defineProps<{ event: Event }>();
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Medal Details for {{ event.name }}</h2>

    <!-- Until 2024 Medals -->
    <h3 class="text-lg font-semibold mt-6 mb-2">Until 2024</h3>
    <table class="w-full border-collapse mb-6">
      <thead>
        <tr>
          <th class="px-4 py-2 border bg-gray-100">Sport</th>
          <th class="px-4 py-2 border bg-gray-100">Gold</th>
          <th class="px-4 py-2 border bg-gray-100">Silver</th>
          <th class="px-4 py-2 border bg-gray-100">Bronze</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in event.medals_by_sport?.until_2024?.sports || []" :key="sport.name">
          <td class="px-4 py-2 border">{{ sport.name }}</td>
          <td class="px-4 py-2 border">{{ sport.gold }}</td>
          <td class="px-4 py-2 border">{{ sport.silver }}</td>
          <td class="px-4 py-2 border">{{ sport.bronze }}</td>
        </tr>
      </tbody>
    </table>
    <p class="text-sm font-medium">Total Gold: {{ event.medals_by_sport?.until_2024?.total?.gold || 0 }}</p>
    <p class="text-sm font-medium">Total Silver: {{ event.medals_by_sport?.until_2024?.total?.silver || 0 }}</p>
    <p class="text-sm font-medium">Total Bronze: {{ event.medals_by_sport?.until_2024?.total?.bronze || 0 }}</p>

    <!-- In 2024 Medals -->
    <h3 class="text-lg font-semibold mt-6 mb-2">In 2024</h3>
    <table class="w-full border-collapse mb-6">
      <thead>
        <tr>
          <th class="px-4 py-2 border bg-gray-100">Sport</th>
          <th class="px-4 py-2 border bg-gray-100">Gold</th>
          <th class="px-4 py-2 border bg-gray-100">Silver</th>
          <th class="px-4 py-2 border bg-gray-100">Bronze</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in event.medals_by_sport?.in_2024?.sports || []" :key="sport.name">
          <td class="px-4 py-2 border">{{ sport.name }}</td>
          <td class="px-4 py-2 border">{{ sport.gold }}</td>
          <td class="px-4 py-2 border">{{ sport.silver }}</td>
          <td class="px-4 py-2 border">{{ sport.bronze }}</td>
        </tr>
      </tbody>
    </table>
    <p class="text-sm font-medium">Total Gold: {{ event.medals_by_sport?.in_2024?.total?.gold || 0 }}</p>
    <p class="text-sm font-medium">Total Silver: {{ event.medals_by_sport?.in_2024?.total?.silver || 0 }}</p>
    <p class="text-sm font-medium">Total Bronze: {{ event.medals_by_sport?.in_2024?.total?.bronze || 0 }}</p>
  </div>
</template>

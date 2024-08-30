<script setup lang="ts">
import { defineProps } from 'vue';
import { type Event } from '@/type';

defineProps<{ event: Event }>();
</script>

<template>
  <div>
    <h2>Medal Details for {{ event.name }}</h2>

    <!-- Until 2024 Medals -->
    <h3>Until 2024</h3>
    <table class="medal-table">
      <thead>
        <tr>
          <th>Sport</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in event.medals_by_sport?.until_2024?.sports || []" :key="sport.name">
          <td>{{ sport.name }}</td>
          <td>{{ sport.gold }}</td>
          <td>{{ sport.silver }}</td>
          <td>{{ sport.bronze }}</td>
        </tr>
      </tbody>
    </table>
    <p>Total Gold: {{ event.medals_by_sport?.until_2024?.total?.gold || 0 }}</p>
    <p>Total Silver: {{ event.medals_by_sport?.until_2024?.total?.silver || 0 }}</p>
    <p>Total Bronze: {{ event.medals_by_sport?.until_2024?.total?.bronze || 0 }}</p>

    <!-- In 2024 Medals -->
    <h3>In 2024</h3>
    <table class="medal-table">
      <thead>
        <tr>
          <th>Sport</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in event.medals_by_sport?.in_2024?.sports || []" :key="sport.name">
          <td>{{ sport.name }}</td>
          <td>{{ sport.gold }}</td>
          <td>{{ sport.silver }}</td>
          <td>{{ sport.bronze }}</td>
        </tr>
      </tbody>
    </table>
    <p>Total Gold: {{ event.medals_by_sport?.in_2024?.total?.gold || 0 }}</p>
    <p>Total Silver: {{ event.medals_by_sport?.in_2024?.total?.silver || 0 }}</p>
    <p>Total Bronze: {{ event.medals_by_sport?.in_2024?.total?.bronze || 0 }}</p>
  </div>
</template>

<style scoped>
.medal-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.medal-table th,
.medal-table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

.medal-table th {
  background-color: #f4f4f4;
}
</style>

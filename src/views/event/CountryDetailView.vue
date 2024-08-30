<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EventService from '@/services/Service'

const route = useRoute()
const country = ref(null)
const error = ref(null)


</script>

<template>
  <div>
    <h2>Country Details</h2>
    <div v-if="country">
      <p>Country Name: {{ country.name }}</p>
      <p>Description: {{ country.description }}</p>
    </div>
    <div v-else>
      <p v-if="error">{{ error }}</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

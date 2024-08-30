<script setup lang="ts">
</script>
<template>
  <div id="layout">
    <header>
      <div class="p-8">
        <nav>
          <RouterLink
            :to="{ name: 'list-view' }"
            class="font-bold text-gray-800 hover:text-green-500 transition"
          >
            Home
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>


<script setup lang="ts">

</script>

<template>
  <main>
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
  </table>
  </main>
</template>

<style scoped>
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
}</style>
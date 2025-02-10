<script setup lang="ts">
// This should be proxied
// const data = ref(['a', 'b', 'c']);
const { data } = await useFetch("/api/users", { server: false });

console.log('data jsou nactena na serveru', data.value);

watchEffect(() => {
  console.log('data jsou nactena', data.value);
});
</script>

<template>
  <!-- <pre>{{ datax }}</pre> -->
  <pre>{{ data }}</pre>
  <div v-if="data">Data: {{ data }}</div>
  <a href="/api/users" target="_blank"> To the Endpoint </a>
</template>

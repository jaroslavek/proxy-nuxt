<script setup lang="ts">
const delayTime = ref(1200);
const dataTwice = ref([{ dataTwice: "dataTwice" }]);
// const pending = ref(true);
// const error = ref(null);

// Funkce pro zpoždění (delay)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Počkej 3 sekundy (3000 ms)
await delay(delayTime.value);

// Po 3 vteřinách zavolej useFetch
const { data, error, status } = await useFetch<Array<any>>("/api/users", {
  server: true,
});

// Logování výsledků
console.log(`✅ Data po: ${delayTime.value} ms:`, data.value);

if (error.value) {
  console.error("❌ Chyba při načítání:", error.value);
}

onMounted(async () => {
  dataTwice.value = await $fetch("/api/users");
  console.log("dataTwice", dataTwice);
});

// Sleduje explicitně jen `data`
watch(
  data,
  (newValue: any, oldValue: any) => {
    console.log("watch:data", data);
    console.log("📊 Změna dat:", { oldValue, newValue });
  },
  { immediate: true }
); // Spustí se i hned při načtení komponenty
</script>

<template>
  <div v-if="status == 'pending'">⏳ Načítání dat...</div>
  <div v-else-if="error">❌ Chyba: {{ error.message }}</div>
  <div v-else>
    <h2>✅ Načtená data po {{ delayTime }} milisekundách:</h2>
    <pre v-if="data">{{ data[0] }}</pre>
  </div>
  <div><h1>DataTwice:</h1></div>
  <pre>{{ dataTwice ? dataTwice[0] : "Žádná data" }}</pre>
</template>

<script setup lang="ts">
/* Navigation will occur before fetching is complete.
 * Handle 'pending' and 'error' states directly within your component's template
 */
const { status, data: posts } = await useFetch<any[]>("/api/posts", {
  // probiha i na serveru
  server: true,
  transform: (data) => {
    if (!data) return []; // Ochrana proti null
    const computed = data.map((post) => ({
      ...post,
      computedValue: post.id * 10, // Přidání dynamického sloupce
    }));

    const filtered = data.slice(0, 5); // Omezení na prvních 5 záznamů

    return filtered;
  },
});

watch(posts, (newPosts) => {
  // Because posts might start out null, you won't have access
  // to its contents immediately, but you can watch it.
  console.log("watch posts: ", posts);
});
</script>

<template>
  <div v-if="status === 'pending'">Loading ...</div>
  <div v-else>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Název</th>
          <th>Dynamický sloupec</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.computedValue }}</td>
          <!-- Nový sloupec -->
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="status === 'pending'">Loading ...</div>
  <div v-else>
    <div v-for="post in posts">
      <pre>row:{{ post }}</pre>
    </div>
  </div>
</template>

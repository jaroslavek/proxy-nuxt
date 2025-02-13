import { ref, computed, readonly } from 'vue'

export async function useFetchUser () {
  const user = ref()
  const history = computed(() => user.value ?? {})

  async function fetchUser () {
    user.value = await fetch('/api/v1/user') // some api call
  }

  // More helpers here optionally

  return {
    user: readonly(user),
    fetchUser,
    history
  }
}
import { ref, watch, onUnmounted } from 'vue'
import { useUsersStore } from '@/stores/useUsersStore'

export function useSearch(delay: number = 350) {
  const store = useUsersStore()
  const localQuery = ref<string>('')
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(localQuery, (newValue: string) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      store.setSearchQuery(newValue)
    }, delay)
  })

  function clearSearch(): void {
    localQuery.value = ''
    store.setSearchQuery('')
  }

  onUnmounted(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  return { localQuery, clearSearch }
}

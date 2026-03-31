import { computed } from 'vue'
import { useUsersStore } from '@/stores/useUsersStore'
import type { FilterState } from '@/types/user'

export function useFilter() {
  const store = useUsersStore()

  const activeCriteria = computed(() => store.filter.criteria)
  const activeValue = computed(() => store.filter.value)

  function applyFilter(criteria: FilterState['criteria'], value: string): void {
    store.setFilter(criteria, value)
  }

  function resetFilter(): void {
    store.setFilter('all', '')
  }

  return {
    activeCriteria,
    activeValue,
    availableCities: computed(() => store.availableCities),
    availableCompanies: computed(() => store.availableCompanies),
    applyFilter,
    resetFilter,
  }
}

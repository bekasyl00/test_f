import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userService } from '@/services/userService'
import type { User, FilterState } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  // State
  const users = ref<User[]>([])
  const searchQuery = ref<string>('')
  const filter = ref<FilterState>({ criteria: 'all', value: '' })
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Getters
  const filteredUsers = computed<User[]>(() => {
    let result = users.value

    const query = searchQuery.value.toLowerCase().trim()
    if (query) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      )
    }

    if (filter.value.criteria !== 'all' && filter.value.value) {
      result = result.filter((user) => {
        if (filter.value.criteria === 'city') {
          return user.address.city === filter.value.value
        }
        if (filter.value.criteria === 'company') {
          return user.company.name === filter.value.value
        }
        return true
      })
    }

    return result
  })

  const availableCities = computed<string[]>(() =>
    [...new Set(users.value.map((u) => u.address.city))].sort()
  )

  const availableCompanies = computed<string[]>(() =>
    [...new Set(users.value.map((u) => u.company.name))].sort()
  )

  const totalCount = computed<number>(() => users.value.length)
  const filteredCount = computed<number>(() => filteredUsers.value.length)

  // Actions
  async function fetchUsers(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      users.value = await userService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Неизвестная ошибка'
      users.value = []
    } finally {
      isLoading.value = false
    }
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
  }

  function setFilter(criteria: FilterState['criteria'], value: string): void {
    filter.value = { criteria, value }
  }

  function resetFilters(): void {
    searchQuery.value = ''
    filter.value = { criteria: 'all', value: '' }
  }

  return {
    users,
    searchQuery,
    filter,
    isLoading,
    error,
    filteredUsers,
    availableCities,
    availableCompanies,
    totalCount,
    filteredCount,
    fetchUsers,
    setSearchQuery,
    setFilter,
    resetFilters,
  }
})

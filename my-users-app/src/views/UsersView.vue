<template>
  <div class="users-view">
    <header class="page-header">
      <h1 class="page-title">Список пользователей</h1>
      <p class="page-subtitle">Данные загружены с JSONPlaceholder API</p>
    </header>

    <div class="controls">
      <SearchBar />
      <FilterPanel v-if="!store.isLoading && !store.error" />
    </div>

    <AppLoader v-if="store.isLoading" />

    <AppError
      v-else-if="store.error"
      :message="store.error"
      @retry="store.fetchUsers()"
    />

    <UserList
      v-else
      :users="store.filteredUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/useUsersStore'
import SearchBar from '@/components/SearchBar.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import UserList from '@/components/UserList.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppError from '@/components/AppError.vue'

const store = useUsersStore()

onMounted(() => {
  store.fetchUsers()
})
</script>

<style scoped>
.users-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
}

.page-subtitle {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

.controls {
  margin-bottom: 8px;
}
</style>

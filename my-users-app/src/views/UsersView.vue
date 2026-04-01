<template>
  <div class="users-view">
    <header class="page-header animate-fade-in">
      <div class="header-content">
        <h1 class="page-title">Сотрудники компании</h1>
        <p class="page-subtitle">База данных корпоративной сети</p>
      </div>
      <div class="header-decoration"></div>
    </header>

    <div class="controls animate-slide-up">
      <SearchBar />
      <FilterPanel v-if="!store.isLoading && !store.error" />
    </div>

    <!-- Обновленный Skeleton Loading вместо кругового лоадера -->
    <div v-if="store.isLoading" class="skeleton-grid">
      <AppSkeleton v-for="i in 9" :key="i" />
    </div>

    <AppError
      v-else-if="store.error"
      :message="store.error"
      @retry="store.fetchUsers()"
      class="animate-fade-in"
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
import AppSkeleton from '@/components/AppSkeleton.vue'
import AppError from '@/components/AppError.vue'

const store = useUsersStore()

onMounted(() => {
  store.fetchUsers()
})
</script>

<style scoped>
.users-view {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  position: relative;
  z-index: 2;
}

.page-title {
  font-size: 40px;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 8px;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin: 0;
  font-weight: 500;
}

.header-decoration {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%);
  position: absolute;
  top: -40px;
  right: -20px;
  border-radius: 50%;
  z-index: 1;
}

.controls {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
  animation-delay: 0.1s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .page-title {
    font-size: 32px;
  }
}
</style>

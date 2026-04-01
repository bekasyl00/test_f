<template>
  <div class="user-list-wrapper">
    <!-- List Stats -->
    <div class="list-stats" v-if="users.length > 0 || store.searchQuery || store.filter.criteria !== 'all'">
      <span class="stats-text">
        <span class="highlight">{{ store.filteredCount }}</span> найдено из <span class="highlight">{{ store.totalCount }}</span>
      </span>
    </div>

    <!-- Empty State -->
    <div v-if="users.length === 0" class="empty-state glass-panel">
      <div class="empty-icon-wrapper">
        <Search class="empty-icon" />
      </div>
      <h3 class="empty-title">Ничего не найдено</h3>
      <p class="empty-subtitle">Попробуйте изменить параметры поиска или сбросить фильтры</p>
      <button class="reset-all-btn" type="button" @click="store.resetFilters()">
        <RotateCcw class="reset-icon" />
        Сбросить фильтры
      </button>
    </div>

    <!-- User Grid -->
    <TransitionGroup v-else name="list" tag="ul" class="user-grid">
      <li v-for="user in users" :key="user.id" class="user-grid-item">
        <UserCard :user="user" />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Search, RotateCcw } from 'lucide-vue-next'
import UserCard from './UserCard.vue'
import { useUsersStore } from '@/stores/useUsersStore'
import type { User } from '@/types/user'

defineProps<{ users: User[] }>()

const store = useUsersStore()
</script>

<style scoped>
.user-list-wrapper {
  flex: 1;
}

.list-stats {
  margin-bottom: 24px;
  animation: fadeIn 0.5s ease;
}

.stats-text {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.highlight {
  color: var(--primary);
  font-weight: 700;
}

.user-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .user-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .user-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.user-grid-item {
  display: flex;
}

/* Transitions for list */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease;
}

.empty-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: var(--primary);
}

.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 12px;
}

.empty-subtitle {
  font-size: 15px;
  color: var(--text-muted);
  margin: 0 0 32px;
  max-width: 320px;
}

.reset-all-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.reset-all-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.reset-icon {
  width: 18px;
  height: 18px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

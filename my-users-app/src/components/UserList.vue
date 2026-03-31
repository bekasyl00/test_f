<template>
  <div class="user-list-wrapper">
    <div class="list-stats" v-if="users.length > 0 || store.searchQuery || store.filter.criteria !== 'all'">
      <span class="stats-text">
        Показано {{ store.filteredCount }} из {{ store.totalCount }}
      </span>
    </div>

    <div v-if="users.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <p class="empty-title">Ничего не найдено</p>
      <p class="empty-subtitle">Попробуйте изменить параметры поиска или фильтра</p>
      <button class="reset-all-btn" type="button" @click="store.resetFilters()">
        Сбросить всё
      </button>
    </div>

    <ul v-else class="user-grid">
      <li v-for="user in users" :key="user.id" class="user-grid-item">
        <UserCard :user="user" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
  margin-bottom: 16px;
}

.stats-text {
  font-size: 13px;
  color: #6b7280;
}

.user-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.user-grid-item {
  display: contents;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px;
}

.empty-subtitle {
  font-size: 14px;
  margin: 0 0 20px;
}

.reset-all-btn {
  padding: 8px 20px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.reset-all-btn:hover {
  background: #4f46e5;
}
</style>

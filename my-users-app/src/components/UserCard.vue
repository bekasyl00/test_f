<template>
  <article class="user-card">
    <div class="card-header">
      <div class="avatar">{{ initials }}</div>
      <div class="user-main">
        <h3 class="user-name">{{ user.name }}</h3>
        <span class="user-username">@{{ user.username }}</span>
      </div>
    </div>

    <div class="card-body">
      <div class="info-row">
        <span class="info-icon">✉</span>
        <a :href="`mailto:${user.email}`" class="info-link">{{ user.email }}</a>
      </div>
      <div class="info-row">
        <span class="info-icon">📍</span>
        <span class="info-text">{{ user.address.city }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">🏢</span>
        <span class="info-text">{{ user.company.name }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">🌐</span>
        <a :href="`https://${user.website}`" target="_blank" class="info-link">{{ user.website }}</a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/user'

const props = defineProps<{ user: User }>()

const initials = computed<string>(() => {
  return props.user.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
})
</script>

<style scoped>
.user-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.15s, box-shadow 0.15s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-main {
  min-width: 0;
}

.user-name {
  margin: 0 0 2px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-username {
  font-size: 13px;
  color: #6b7280;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-icon {
  font-size: 14px;
  flex-shrink: 0;
  width: 18px;
  text-align: center;
}

.info-text {
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-link {
  color: #6366f1;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-link:hover {
  text-decoration: underline;
}
</style>

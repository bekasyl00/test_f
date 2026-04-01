<template>
  <article class="user-card glass-panel">
    <div class="card-header">
      <div class="avatar-wrapper">
        <div class="avatar">{{ initials }}</div>
      </div>
      <div class="user-main">
        <h3 class="user-name">{{ user.name }}</h3>
        <span class="user-username">@{{ user.username }}</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="card-body">
      <div class="info-row">
        <Mail class="info-icon" />
        <a :href="`mailto:${user.email}`" class="info-link">{{ user.email }}</a>
      </div>
      <div class="info-row" v-if="user.address_city">
        <MapPin class="info-icon" />
        <span class="info-text">{{ user.address_city }}</span>
      </div>
      <div class="info-row" v-if="user.company_name">
        <Briefcase class="info-icon" />
        <span class="info-text">{{ user.company_name }}</span>
      </div>
      <div class="info-row" v-if="user.website">
        <Globe class="info-icon" />
        <a :href="`https://${user.website}`" target="_blank" class="info-link">{{ user.website }}</a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Mail, MapPin, Briefcase, Globe } from 'lucide-vue-next'
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
  width: 100%;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.user-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.15), 0 8px 10px -6px rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}

.user-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.user-name {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-username {
  font-size: 14px;
  color: var(--primary);
  font-weight: 500;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, rgba(0,0,0,0.05), transparent);
  margin-bottom: 20px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.info-icon {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.info-text, .info-link {
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.info-link {
  transition: color 0.2s;
}

.info-link:hover {
  color: var(--primary);
  text-decoration: underline;
}
</style>

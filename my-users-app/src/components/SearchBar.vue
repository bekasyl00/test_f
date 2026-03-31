<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        v-model="localQuery"
        type="search"
        class="search-input"
        placeholder="Поиск по имени, email или username..."
        autocomplete="off"
        spellcheck="false"
      />
      <button
        v-if="localQuery"
        class="clear-btn"
        type="button"
        aria-label="Очистить поиск"
        @click="clearSearch"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearch } from '@/composables/useSearch'

const { localQuery, clearSearch } = useSearch(350)
</script>

<style scoped>
.search-bar {
  margin-bottom: 16px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #9ca3af;
  pointer-events: none;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  padding: 12px 44px 12px 44px;
  font-size: 15px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 14px;
  padding: 4px;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.15s;
}

.clear-btn:hover {
  color: #374151;
}
</style>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper glass-panel">
      <Search class="search-icon" />
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
        <X class="clear-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { useSearch } from '@/composables/useSearch'

const { localQuery, clearSearch } = useSearch(350)
</script>

<style scoped>
.search-bar {
  margin-bottom: 24px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
}

.search-input-wrapper:focus-within {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2), var(--shadow-sm);
  border-color: var(--primary);
  transform: translateY(-1px);
}

.search-icon {
  position: absolute;
  left: 16px;
  color: var(--text-muted);
  pointer-events: none;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  transition: color 0.3s;
}

.search-input-wrapper:focus-within .search-icon {
  color: var(--primary);
}

.search-input {
  width: 100%;
  padding: 16px 48px 16px 48px;
  font-size: 16px;
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  color: var(--text-main);
}

.search-input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: rgba(0,0,0,0.05);
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.clear-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  transform: scale(1.05);
}

.clear-icon {
  width: 16px;
  height: 16px;
}
</style>

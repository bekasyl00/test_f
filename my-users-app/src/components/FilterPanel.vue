<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label class="filter-label">Фильтр по:</label>
      <div class="filter-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: activeCriteria === tab.value }"
          type="button"
          @click="handleCriteriaChange(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="activeCriteria !== 'all'" class="filter-select-group">
      <select
        class="filter-select"
        :value="activeValue"
        @change="handleValueChange"
      >
        <option value="">— Все —</option>
        <option
          v-for="option in currentOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <button
      v-if="activeCriteria !== 'all' || activeValue"
      class="reset-btn"
      type="button"
      @click="resetFilter"
    >
      Сбросить фильтры
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilter } from '@/composables/useFilter'
import type { FilterState } from '@/types/user'

const { activeCriteria, activeValue, availableCities, availableCompanies, applyFilter, resetFilter } = useFilter()

const tabs: { label: string; value: FilterState['criteria'] }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Город', value: 'city' },
  { label: 'Компания', value: 'company' },
]

const currentOptions = computed<string[]>(() => {
  if (activeCriteria.value === 'city') return availableCities.value
  if (activeCriteria.value === 'company') return availableCompanies.value
  return []
})

function handleCriteriaChange(criteria: FilterState['criteria']): void {
  applyFilter(criteria, '')
}

function handleValueChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  applyFilter(activeCriteria.value, target.value)
}
</script>

<style scoped>
.filter-panel {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
}

.filter-tabs {
  display: flex;
  gap: 6px;
}

.filter-tab {
  padding: 6px 14px;
  font-size: 13px;
  border: 1.5px solid #e5e7eb;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
  color: #374151;
}

.filter-tab:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.filter-tab.active {
  background: #6366f1;
  border-color: #6366f1;
  color: #fff;
}

.filter-select {
  padding: 7px 12px;
  font-size: 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  outline: none;
  min-width: 160px;
}

.filter-select:focus {
  border-color: #6366f1;
}

.reset-btn {
  padding: 7px 14px;
  font-size: 13px;
  border: 1.5px solid #fca5a5;
  border-radius: 8px;
  background: #fff;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: auto;
}

.reset-btn:hover {
  background: #fef2f2;
}
</style>

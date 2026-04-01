<template>
  <div class="filter-panel glass-panel">
    <div class="filter-group">
      <Filter class="filter-icon" />
      <span class="filter-label">Фильтр:</span>
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

    <div v-if="activeCriteria !== 'all'" class="filter-select-group animate-slide-in">
      <select
        class="filter-select"
        :value="activeValue"
        @change="handleValueChange"
      >
        <option value="">— Выбрать —</option>
        <option
          v-for="option in currentOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Filter } from 'lucide-vue-next'
import { useFilter } from '@/composables/useFilter'
import type { FilterState } from '@/types/user'

const { activeCriteria, activeValue, availableCities, availableCompanies, applyFilter } = useFilter()

const tabs: { label: string; value: FilterState['criteria'] }[] = [
  { label: 'Все', value: 'all' },
  { label: '🏙 Город', value: 'city' },
  { label: '🏢 Компания', value: 'company' },
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
  gap: 16px;
  margin-bottom: 32px;
  padding: 16px 20px;
  border-radius: 16px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-icon {
  width: 18px;
  height: 18px;
  color: var(--primary);
}

.filter-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

.filter-tabs {
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.03);
  padding: 4px;
  border-radius: 20px;
}

.filter-tab {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-muted);
}

.filter-tab:hover {
  color: var(--text-main);
}

.filter-tab.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.filter-select-group {
  position: relative;
  min-width: 200px;
}

.filter-select {
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  background: rgba(255,255,255,0.8);
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.filter-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.animate-slide-in {
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>

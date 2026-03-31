<template>
  <div class="error-wrapper" role="alert">
    <div class="error-icon">⚠️</div>
    <h3 class="error-title">Произошла ошибка</h3>
    <p class="error-message">{{ message }}</p>
    <button class="retry-btn" type="button" @click="$emit('retry')">
      Попробовать снова
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ retry: [] }>()
</script>

<style scoped>
.error-wrapper {
  text-align: center;
  padding: 60px 20px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.error-message {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px;
}

.retry-btn {
  padding: 10px 24px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
}

.retry-btn:hover {
  background: #4f46e5;
}
</style>

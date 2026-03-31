<template>
  <div class="loader-wrapper" role="status" aria-label="Загрузка данных">
    <div class="spinner"></div>
    <p class="loader-text">Загрузка пользователей...</p>
  </div>
</template>

<style scoped>
.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}
</style>

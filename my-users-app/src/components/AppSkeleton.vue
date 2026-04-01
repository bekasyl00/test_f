<template>
  <div class="skeleton-wrapper glass-panel">
    <div class="skeleton-header">
      <div class="skeleton-avatar pulse"></div>
      <div class="skeleton-main">
        <div class="skeleton-line title pulse"></div>
        <div class="skeleton-line subtitle pulse"></div>
      </div>
    </div>
    
    <div class="skeleton-divider"></div>

    <div class="skeleton-body">
      <div class="skeleton-row" v-for="i in 3" :key="i">
        <div class="skeleton-icon pulse"></div>
        <div class="skeleton-line text pulse" :style="{ width: `${Math.random() * 40 + 40}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-wrapper {
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.pulse {
  background: linear-gradient(90deg, rgba(200, 205, 215, 0.4) 25%, rgba(200, 205, 215, 0.8) 50%, rgba(200, 205, 215, 0.4) 75%);
  background-size: 200% 100%;
  animation: loadingPulse 1.5s infinite linear;
}

@keyframes loadingPulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  flex-shrink: 0;
}

.skeleton-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  height: 12px;
  border-radius: 6px;
}

.skeleton-line.title {
  width: 60%;
  height: 16px;
}

.skeleton-line.subtitle {
  width: 40%;
}

.skeleton-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.skeleton-icon {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  flex-shrink: 0;
}

.skeleton-line.text {
  height: 12px;
}
</style>

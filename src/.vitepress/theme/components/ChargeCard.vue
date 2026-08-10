<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="发电支持"
    class="charge-card"
  >
    <div class="charge-action">
      <span class="charge-btn">
        <Icon name="simple-icons:afdian" class="charge-icon" />
        发电
      </span>
    </div>
    <div class="charge-status">
      <!-- 底层灰色电路 -->
      <svg width="140" height="68" viewBox="0 0 140 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="circuit">
          <path d="M0 19H30.3L43 5.5H115" stroke-width="4" />
          <path d="M0 27H34.3L47 13.6H140" stroke-width="4" />
          <path d="M0 35H34.3" stroke-width="4" />
          <path d="M0 43H34.3L47 57H115" stroke-width="4" />
          <path d="M0 51H30.3L43 65H140" stroke-width="4" />
          <ellipse cx="119" cy="5" rx="4" ry="4" stroke-width="3" />
          <ellipse cx="119" cy="56.4352" rx="4" ry="4" stroke-width="3" />
        </g>
        <!-- 悬停时粉色闪电填充层 -->
        <g class="power">
          <path d="M0 19H30.3L43 5.5H115" stroke-width="4" />
          <path d="M0 27H34.3L47 13.6H140" stroke-width="4" />
          <path d="M0 35H34.3" stroke-width="4" />
          <path d="M0 43H34.3L47 57H115" stroke-width="4" />
          <path d="M0 51H30.3L43 65H140" stroke-width="4" />
          <ellipse cx="119" cy="5" rx="4" ry="4" stroke-width="3" />
          <ellipse cx="119" cy="56.4352" rx="4" ry="4" stroke-width="3" />
        </g>
        <!-- 悬停时电流流动层 -->
        <g class="travel">
          <path class="line line1" d="M0 19H30.3L43 5.5H115" stroke-width="4" />
          <path class="line line2" d="M0 27H34.3L47 13.6H140" stroke-width="4" />
          <path class="line line3" d="M0 35H34.3" stroke-width="4" />
          <path class="line line4" d="M0 43H34.3L47 57H115" stroke-width="4" />
          <path class="line line3" d="M0 51H30.3L43 65H140" stroke-width="4" />
          <ellipse class="dot dot1" cx="119" cy="5" rx="4" ry="4" stroke-width="3" />
          <ellipse class="dot dot2" cx="119" cy="56.4352" rx="4" ry="4" stroke-width="3" />
        </g>
      </svg>
      <div class="charge-count">发电支持TA</div>
    </div>
  </a>
</template>

<style scoped>
.charge-card {
  --charge: #936be5;
  --charge-hover: #a482f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  overflow: hidden;
  text-decoration: none;
  padding: 1.25rem;
}

.dark .charge-card {
  --charge: #3b1884;
  --charge-hover: #4a2299;
}

.charge-action {
  flex: 0 0 auto;
  overflow: hidden;
  display: flex;
}

.charge-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 5.5rem;
  height: 2.125rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--charge);
  border-radius: 6px;
  transition: background-color 0.3s;
}

.charge-btn:hover {
  background-color: var(--charge-hover);
}

.charge-icon {
  color: #fff;
  font-size: 1.5rem;
}

.charge-status {
  position: relative;
  width: 8.75rem;
  height: 4.25rem;
  display: flex;
  flex-shrink: 0;
}

.charge-status svg {
  stroke: var(--vp-c-divider);
}

.charge-status .travel,
.charge-status .power {
  stroke: transparent;
}

.charge-card:hover .power path {
  stroke: var(--charge);
  stroke-dasharray: 200%, 200%;
  stroke-dashoffset: 0%;
  animation: power-fill 0.5s cubic-bezier(0, 0.5, 0.5, 1) 1;
}

.charge-card:hover .power ellipse {
  animation: power-dot 0.5s linear 1;
}

.charge-card:hover .travel .line {
  stroke: #ffd52b;
  stroke-dasharray: 15%, 200%;
  stroke-dashoffset: 15%;
  animation: charge-flow 1s linear 0.5s infinite, travel-visible 0s linear 0.5s both;
}

.charge-card:hover .travel .dot {
  animation: charge-dot 1s linear 0.5s infinite;
}

@keyframes power-fill {
  0% {
    stroke-dashoffset: 200%;
  }

  to {
    stroke-dashoffset: 0%;
  }
}

@keyframes power-dot {
  0% {
    stroke: var(--vp-c-divider);
  }

  50% {
    stroke: var(--vp-c-divider);
  }

  51% {
    stroke: var(--charge);
  }

  to {
    stroke: var(--charge);
  }
}

@keyframes charge-flow {
  0% {
    stroke-dashoffset: 15%;
  }

  70% {
    stroke-dashoffset: -200%;
  }

  to {
    stroke-dashoffset: -200%;
  }
}

@keyframes charge-dot {
  0% {
    stroke: var(--charge);
  }

  39% {
    stroke: var(--charge);
  }

  40% {
    stroke: #ffd52b;
  }

  45% {
    stroke: #ffd52b;
  }

  46% {
    stroke: var(--charge);
  }

  to {
    stroke: var(--charge);
  }
}

@keyframes travel-visible {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.charge-count {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  text-indent: 2.25rem;
  white-space: nowrap;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 400;
}
</style>

<template>
  <div class="hero-container">
    <div class="hero-section gradient-hero">
      <div class="main">
        <div class="content">
          <div class="text">
            <h1 class="name">{{ config.name }}</h1>
            <p class="tagline">{{ config.tagline }}</p>
            <div class="actions">
              <a class="action theme-brand" :href="config.actions[0].link">
                <svg t="1762734394556" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="7463" width="24" height="24">
                  <path
                      d="M386.92 498.112a130.632 130.632 0 0 1 23.172-2.082l-6.244-0.03h207.646a96.244 96.244 0 0 0 25.816-3.508c38.74-10.726 66.69-45.074 66.69-87.326V230.718c0-49.664-42.3-86.968-92.578-95.212-31.862-5.248-78.516-7.654-110.178-7.498-31.658 0.172-61.962 2.808-88.554 7.498-78.404 13.646-92.69 42.35-92.69 95.212V288h192v32H257.64c-71.256 0-129.076 85.142-129.626 190.484-0.004 0.506-0.014 1.01-0.014 1.516 0 19.046 1.88 37.44 5.37 54.808C149.296 646.14 198.902 704 257.64 704H288v-91.87c0-53.654 40.292-103.466 98.92-114.018z m20.392-244.108c-19.184 0-34.768-15.57-34.768-34.806 0-19.328 15.548-35.04 34.768-35.04 19.148 0 34.798 15.71 34.798 35.04 0.002 19.236-15.618 34.806-34.798 34.806z"
                      p-id="7464"></path>
                  <path
                      d="M887.902 445.086C869.56 372.042 822.066 320 766.36 320H736v81.344c0 67.83-44.572 116.948-98.978 125.362a107.886 107.886 0 0 1-16.602 1.292H412.702a102.82 102.82 0 0 0-26.098 3.344C348.36 541.378 320 573.2 320 614.472v174.454c0 49.664 49.954 78.852 98.962 93.102 58.654 17.062 122.534 20.136 192.732 0C658.3 868.708 704 841.786 704 788.926V736H512v-32h254.36c50.48 0 94.214-42.73 115.628-105.098C890.948 572.808 896 543.282 896 512c0-23.536-2.866-46.076-8.098-66.914zM615.734 765.64c19.18 0 34.762 15.57 34.762 34.8 0 19.3-15.582 35.042-34.762 35.042-19.154 0-34.798-15.742-34.798-35.042 0-19.26 15.612-34.8 34.798-34.8z"
                      p-id="7465"></path>
                </svg>
                {{ config.actions[0].text }}
              </a>
              <a class="action theme-alt" :href="config.actions[1].link">
                {{ config.actions[1].text }}
              </a>
            </div>
          </div>
          <div class="preview-container">
            <div class="preview-image">
              <img :src=config.image alt="VIPER Preview">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.hero-container {
  padding: 2rem;
}

.hero-section {
  height: calc(100vh - var(--vp-nav-height) - 4rem);
  min-height: 800px; /* 添加最小高度 */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  position: relative;
  background-size: 200% 200%;
  animation: gradientBg 30s ease infinite;
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
}

.gradient-hero {
  background: /* 左上角 */ radial-gradient(circle at 0% 0%, rgba(255, 71, 71, 0.85) 0%, transparent 25%),
    /* 右上角 */ radial-gradient(circle at 100% 0%, rgba(123, 97, 255, 0.85) 0%, transparent 25%),
    /* 上边中间 */ radial-gradient(circle at 50% 0%, rgba(255, 105, 180, 0.7) 0%, transparent 25%),
    /* 左边中间 */ radial-gradient(circle at 0% 50%, rgba(0, 255, 255, 0.7) 0%, transparent 25%),
    /* 右边中间 */ radial-gradient(circle at 100% 50%, rgba(191, 64, 255, 0.7) 0%, transparent 25%),
    /* 中心 */ radial-gradient(circle at 50% 50%, rgba(255, 64, 255, 0.6) 0%, transparent 35%),
    /* 左下角 - 增加亮绿色 */ radial-gradient(circle at 0% 100%, rgba(72, 255, 0, 0.8) 0%, transparent 25%),
    /* 右下角 */ radial-gradient(circle at 100% 100%, rgba(64, 166, 255, 0.85) 0%, transparent 25%),
    /* 下边中间 - 增加亮黄色 */ radial-gradient(circle at 50% 100%, rgba(255, 251, 0, 0.75) 0%, transparent 25%),
    /* 整体底色 - 稍微调亮 */ linear-gradient(45deg, rgba(0, 0, 0, 0.89), rgba(0, 0, 0, 0.87));
  background-size: 150% 150%;
  animation: gradientFlow 30s ease infinite;
  backdrop-filter: blur(100px);
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 0%, 100% 0%, 50% 0%,
    0% 50%, 100% 50%, 50% 50%,
    0% 100%, 100% 100%, 50% 100%,
    0% 0%;
  }
  25% {
    background-position: 15% 15%, 85% 15%, 65% 15%,
    15% 50%, 85% 50%, 35% 65%,
    15% 85%, 85% 85%, 35% 85%,
    15% 15%;
  }
  50% {
    background-position: 25% 25%, 75% 25%, 75% 25%,
    25% 50%, 75% 50%, 50% 75%,
    25% 75%, 75% 75%, 50% 75%,
    25% 25%;
  }
  75% {
    background-position: 15% 85%, 85% 85%, 65% 85%,
    15% 50%, 85% 50%, 35% 35%,
    15% 15%, 85% 15%, 35% 15%,
    15% 85%;
  }
  100% {
    background-position: 0% 0%, 100% 0%, 50% 0%,
    0% 50%, 100% 50%, 50% 50%,
    0% 100%, 100% 100%, 50% 100%,
    0% 0%;
  }
}

.main {
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 1400px;
  width: 100%;
  height: 100%;
}

.text {
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-shrink: 0;
  padding-top: 2rem;
  padding-bottom: 3rem;
  background: transparent;
}

.name {
  font-size: clamp(4.2rem, 8.5vw, 7.8rem);
  line-height: 1;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  margin: 0;
  padding: 0;
  letter-spacing: -0.02em;
}

.tagline {
  font-size: clamp(1rem, 1.6vw, 1.4rem);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 1400px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.action {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative; /* 添加相对定位 */
}

/* 添加外环基础样式 */
.action::before {
  content: '';
  position: absolute;
  inset: -4px; /* 减小外环距离 */
  border-radius: 13px; /* 相应调整圆角 */
  padding: 1px; /* 减小外环粗细 */
  background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  background-size: 200% 200%;
  animation: none;
  opacity: 0.4; /* 稍微降低默认透明度 */
  transition: opacity 0.3s ease;
}

/* 鼠标悬停时激活流光动画 */
.action:hover::before {
  animation: shine 2s linear infinite;
  opacity: 1;
}

/* 流光动画 */
@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 修改现有的主题按钮样式 */
.theme-brand {
  background: var(--vp-c-white);
  color: var(--vp-c-black);
  border: none;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.theme-brand:hover {
  background: rgba(255, 255, 255, 0.95);
  color: var(--vp-c-black);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

.theme-alt {
  background: rgba(0, 0, 0, 0.8);
  color: var(--vp-c-white);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.theme-alt:hover {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.preview-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: -2rem;
}

.preview-image {
  position: absolute;
  inset: 0;
  overflow: hidden;
  padding: 0;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 960px) {
  .hero-container {
    padding: 1rem;
  }

  .hero-section {
    min-height: 500px; /* 中等屏幕的最小高度 */
    padding: 2rem;
  }

  .name {
    font-size: clamp(3.5rem, 7vw, 5.6rem);
    white-space: normal;
    text-align: center;
  }

  .text {
    padding: 0;
    padding-bottom: 2rem;
    gap: 1.2rem;
  }

  .preview-container {
    margin-bottom: -2rem;
  }

  .preview-image img {
    border-radius: 16px 16px 0 0;
  }

  .tagline {
    font-size: clamp(0.9rem, 1.4vw, 1.2rem);
    white-space: normal;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .hero-container {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  .hero-section {
    min-height: 450px; /* 小屏幕的最小高度 */
    padding: 1.5rem 1.5rem 0 1.5rem;
    border-radius: 16px;
  }

  .content {
    gap: 1rem;
  }
}

:deep(.dark) .hero-section {
  background-blend-mode: overlay;
}

/* 添加光晕效果 */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(20px);
  opacity: 0.7;
  z-index: -1;
}

/* 移除之前的暗色主题叠加层 */
:deep(.dark) .hero-section::after {
  display: none;
}

.docker-icon {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
  transition: transform 0.3s ease;
}

.action.theme-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
}

.action.theme-brand:hover .docker-icon {
  transform: scale(1.1);
}
</style>

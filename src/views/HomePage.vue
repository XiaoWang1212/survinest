<template>
  <div class="home-page">
    <div 
      class="feature safety-scan" 
      @click="navigateTo('ScanPage')" 
      @mouseover="hoverFeature('safety-scan')" 
      @mouseleave="hoverFeature('')"
      :class="{ 
        'hovered': hoveredFeature === 'safety-scan',
        'expanding': expandingFeature === 'safety-scan'
      }"
      :data-darkening="isDarkening"
    >
      <!-- 背景圖片容器 -->
      <div class="feature-bg safety-scan-bg"></div>
      
      <div class="overlay" v-if="hoveredFeature === 'safety-scan'">
        <h2>安全掃描功能</h2>
        <div class="feature-content">
          <p class="main-desc">快速分析環境，提供全方位安全建議</p>
          <ul class="feature-list">
            <li>
              <span class="icon">🗺️</span>
              <span>專屬逃生路線規劃</span>
            </li>
            <li>
              <span class="icon">🏠</span>
              <span>智能避難位置推薦</span>
            </li>
            <li>
              <span class="icon">📍</span>
              <span>防災包最佳擺放建議</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div 
      class="feature survival-kit" 
      @click="navigateTo('SurvivalKitPage')" 
      @mouseover="hoverFeature('survival-kit')" 
      @mouseleave="hoverFeature('')"
      :class="{ 
        'hovered': hoveredFeature === 'survival-kit',
        'expanding': expandingFeature === 'survival-kit'
      }"
      :data-darkening="isDarkening"
    >
      <!-- 背景圖片容器 -->
      <div class="feature-bg survival-kit-bg"></div>
      
      <div class="overlay" v-if="hoveredFeature === 'survival-kit'">
        <h2>防災包功能</h2>
        <div class="feature-content">
          <p class="main-desc">智能物資管理，確保應急準備充足</p>
          <ul class="feature-list">
            <li>
              <span class="icon">📋</span>
              <span>必備物品清單檢查</span>
            </li>
            <li>
              <span class="icon">⚖️</span>
              <span>物資數量配置建議</span>
            </li>
            <li>
              <span class="icon">🕒</span>
              <span>食物飲水用量規劃</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const hoveredFeature = ref('')
    const expandingFeature = ref('')
    const isDarkening = ref(false)

    const hoverFeature = (feature) => {
      hoveredFeature.value = feature
    }

    const navigateTo = async (page) => {
      if (page === 'ScanPage') {
        expandingFeature.value = 'safety-scan'
      } else {
        expandingFeature.value = 'survival-kit'
      }
      
      // 等待展開動畫完成
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 開始暗化
      isDarkening.value = true
      
      // 等待暗化動畫完成
      await new Promise(resolve => setTimeout(resolve, 800))
      
      router.push({ name: page })
    }

    return {
      navigateTo,
      hoverFeature,
      hoveredFeature,
      expandingFeature,
      isDarkening
    }
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.feature {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  height: 100%;
  z-index: 1;
  overflow: hidden; /* 確保圖片不會溢出 */
}

/* 新增背景圖片樣式 */
.feature-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  z-index: -1;
}

.safety-scan-bg {
  background-image: url('@/assets/images/scan-bg.jpg'); /* 安全掃描背景圖片 */
}

.survival-kit-bg {
  background-image: url('@/assets/images/kit-bg.jpg'); /* 防災包背景圖片 */
}

/* 鼠標懸停效果 */
.feature:hover .feature-bg {
  transform: scale(1.05); /* 鼠標懸停時圖片輕微放大 */
}

/* 擴展時的圖片效果 */
.feature.expanding .feature-bg {
  transform: scale(1.1); /* 點擊時圖片放大 */
  transition: transform 0.8s ease;
}

.feature-icon {
  display: none;
}

.feature.expanding {
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 100;
}

.feature.safety-scan.expanding {
  left: 0;
  right: auto;
  width: 50vw;
  animation: expandRight 0.5s ease-out forwards;
}

.feature.survival-kit.expanding {
  right: 0;
  left: auto;
  width: 50vw;
  animation: expandRight 0.5s ease-out forwards;
}

@keyframes expandRight {
  from {
    width: 50vw;
  }
  to {
    width: 100vw;
  }
}

.feature.expanding[data-darkening="true"] {
  width: 100vw !important; /* 確保暗化時是全螢幕 */
  left: 0 !important; /* 確保從左側開始 */
  animation: darken 0.8s ease-in forwards;
}

@keyframes darken {
  0% {
    filter: brightness(1);
    background-color: inherit;
  }
  100% {
    filter: brightness(0);
    background-color: #000;
  }
}

.feature .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  z-index: 2; /* 確保遮罩層在圖片上方 */
}

.feature.hovered .overlay {
  opacity: 1;
}

.feature h2 {
  color: white;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-bottom: 20px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字陰影增強可讀性 */
}

.feature-content {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  color: white;
  margin: 15px 0;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* 添加文字陰影 */
}

.feature.hovered h2 {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s;
}

.feature.hovered .main-desc {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

.feature.hovered .feature-content {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

.feature.hovered .feature-list li:nth-child(1) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

.feature.hovered .feature-list li:nth-child(2) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.5s;
}

.feature.hovered .feature-list li:nth-child(3) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.6s;
}

.main-desc {
  color: white;
  margin: 20px 0;
  font-size: 1.2em;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* 添加文字陰影 */
}

.feature.hovered .main-desc {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

/* 添加響應式設計 */
@media (max-width: 768px) {
  .feature h2 {
    font-size: 2em;
  }
  
  .main-desc {
    font-size: 1em;
  }
  
  .feature-list li {
    margin: 10px 0;
  }
}

@media (max-width: 480px) {
  .home-page {
    flex-direction: column; /* 在手機上改為上下排列 */
  }
  
  .feature h2 {
    font-size: 1.5em;
  }
  
  .feature-list li {
    margin: 8px 0;
  }
}
</style>
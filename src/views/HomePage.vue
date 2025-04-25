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
    >
      <div class="overlay" v-if="hoveredFeature === 'safety-scan'"></div>
      <h2>安全掃描功能</h2>
      <p>快速分析環境，提供逃生路線建議。</p>
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
    >
      <div class="overlay" v-if="hoveredFeature === 'survival-kit'"></div>
      <h2>防災包功能</h2>
      <p>推薦必備物品，幫助您準備防災包。</p>
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

    const navigateTo = async (page) => {
      if (page === 'ScanPage') {
        expandingFeature.value = 'safety-scan'
      } else {
        expandingFeature.value = 'survival-kit'
      }
      
      // 等待動畫完成後再跳轉
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push({ name: page })
    }

    const hoverFeature = (feature) => {
      hoveredFeature.value = feature
    }

    return {
      navigateTo,
      hoverFeature,
      hoveredFeature,
      expandingFeature
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
}

.feature h2, .feature p {
  position: relative;
  z-index: 2;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.feature.safety-scan {
  background-color: #f0ead2;
}

.feature.survival-kit {
  background-color: #dde5b6;
}

.feature .overlay {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature.safety-scan .overlay {
  left: 0;
  width: 100%;
}

.feature.survival-kit .overlay {
  right: 0;
  width: 100%;
}

.feature.hovered .overlay {
  opacity: 1;
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
  animation: expandRight 0.5s ease forwards;
}

.feature.survival-kit.expanding {
  right: 0;
  left: auto;
  animation: expandLeft 0.5s ease forwards;
}

@keyframes expandRight {
  from {
    width: 50vw;
  }
  to {
    width: 100vw;
  }
}

@keyframes expandLeft {
  from {
    width: 50vw;
  }
  to {
    width: 100vw;
  }
}
</style>
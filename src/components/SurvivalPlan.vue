<template>
  <!-- 中文版本 -->
  <div class="survival-plan" v-if="currentLanguage === 'zh'">
    <div class="survival-header">
      <p class="subtitle">資源有限時的智能配給系統，增加您在災難中的生存機會</p>
    </div>
    <div class="survival-features">
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/brain.jpg" alt="智能資源分析" />
        </div>
        <h3>智能資源分析</h3>
        <p>計算現有物資可支持的生存時間，優化每日配給</p>
      </div>
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/supply.jpg" alt="配給管理" />
        </div>
        <h3>配給管理</h3>
        <p>根據人數與特殊需求，自動產生最佳飲食配給計畫</p>
      </div>
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/survive.jpg" alt="生存建議" />
        </div>
        <h3>生存建議</h3>
        <p>即時提供節約資源與延長生存時間的關鍵建議</p>
      </div>
    </div>

    <!-- 防災小知識輪播 -->
    <div class="disaster-carousel">
      <h4>防災小知識</h4>
      <p class="carousel-text">{{ currentKnowledgeZh }}</p>
    </div>
  </div>

  <!-- 英文版本 -->
  <div class="survival-plan" v-else>
    <div class="survival-header">
      <p class="subtitle">Intelligent rationing system for limited resources, increasing your survival chance during disasters</p>
    </div>
    <div class="survival-features">
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/brain.jpg" alt="Smart Resource Analysis" />
        </div>
        <h3>Smart Resource Analysis</h3>
        <p>Calculate survival time based on available supplies and optimize daily rationing</p>
      </div>
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/supply.jpg" alt="Ration Management" />
        </div>
        <h3>Ration Management</h3>
        <p>Auto-generate optimal food distribution plans based on headcount and special needs</p>
      </div>
      <div class="feature">
        <div class="icon-circle">
          <img src="@/assets/photo/survive.jpg" alt="Survival Tips" />
        </div>
        <h3>Survival Tips</h3>
        <p>Provide real-time key suggestions on resource conservation and survival time extension</p>
      </div>
    </div>

    <!-- 防災小知識輪播 -->
    <div class="disaster-carousel">
      <h4>Disaster Knowledge</h4>
      <p class="carousel-text">{{ currentKnowledgeEn }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'SurvivalPlan',
  setup() {
    // 語言控制
    const currentLanguage = ref(localStorage.getItem('preferredLanguage') === 'English' ? 'en' : 'zh')
    
    // 防災小知識輪播 - 中文
    const disasterKnowledgeZh = ref([
      '在災難中，保持冷靜並優先確保飲用水的供應。',
      '請記住，食物的保存期限可能會因環境而縮短，定期檢查物資。',
      '學會使用簡單的工具，如打火石和濾水器，能顯著提高生存機率。'
    ])
    
    // 防災小知識輪播 - 英文
    const disasterKnowledgeEn = ref([
      'During disasters, stay calm and prioritize securing drinking water supplies.',
      'Remember, food shelf life may shorten due to environmental conditions. Check supplies regularly.',
      'Learning to use simple tools like firestones and water filters can significantly improve survival chances.'
    ])
    
    const currentKnowledgeIndex = ref(0)
    const currentKnowledgeZh = ref(disasterKnowledgeZh.value[currentKnowledgeIndex.value])
    const currentKnowledgeEn = ref(disasterKnowledgeEn.value[currentKnowledgeIndex.value])

    let knowledgeInterval = null

    const startKnowledgeRotation = () => {
      knowledgeInterval = setInterval(() => {
        currentKnowledgeIndex.value = (currentKnowledgeIndex.value + 1) % disasterKnowledgeZh.value.length
        currentKnowledgeZh.value = disasterKnowledgeZh.value[currentKnowledgeIndex.value]
        currentKnowledgeEn.value = disasterKnowledgeEn.value[currentKnowledgeIndex.value]
      }, 5000) // 每5秒切換一次
    }

    const stopKnowledgeRotation = () => {
      clearInterval(knowledgeInterval)
    }
    
    // 定義事件處理函數，以便移除時能夠引用相同的函數
    const handleStorageChange = (event) => {
      if (event.key === 'preferredLanguage') {
        currentLanguage.value = event.newValue === 'English' ? 'en' : 'zh'
      }
    }

    onMounted(() => {
      // 載入用戶偏好的語言
      const savedLanguage = localStorage.getItem('preferredLanguage')
      if (savedLanguage === 'English') {
        currentLanguage.value = 'en'
      } else {
        currentLanguage.value = 'zh'
      }
      
      startKnowledgeRotation()
      
      // 添加事件監聽器
      window.addEventListener('storage', handleStorageChange)
    })
    
    // 監聽語言變化
    watch(currentLanguage, (newVal) => {
      localStorage.setItem('preferredLanguage', newVal === 'zh' ? '繁體中文' : 'English')
    })

    onUnmounted(() => {
      stopKnowledgeRotation()
      // 正確移除事件監聽器
      window.removeEventListener('storage', handleStorageChange)
    })

    return {
      currentLanguage,
      currentKnowledgeZh,
      currentKnowledgeEn
    }
  }
}
</script>

<style scoped>
.survival-plan {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.survival-header {
  text-align: center;
  margin-bottom: 30px;
}

.subtitle {
  color: #777;
  font-size: 1.1rem;
  margin-top: 10px;
}

.survival-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.icon-circle {
  width: 60px;
  height: 60px;
  background-color: #e74c3c; /* 圓形背景色 */
  border-radius: 50%; /* 使其成為圓形 */
  margin: 0 auto 15px auto; /* 置中並增加下方間距 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 確保圖片不超出圓形邊界 */
}

.icon-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 確保圖片適應圓形 */
}

.disaster-carousel {
  background-color: #fdecea; /* 修改背景色為紅色調 */
  padding: 15px;
  border-left: 4px solid #e74c3c; /* 修改邊框色為紅色 */
  margin-top: 20px;
  border-radius: 4px;
  text-align: center;
  position: relative;
}

.carousel-text {
  opacity: 1;
  transition: opacity 0.5s ease-in-out; /* 平滑過渡效果 */
}

.carousel-text-leave-active {
  opacity: 0;
}
</style>
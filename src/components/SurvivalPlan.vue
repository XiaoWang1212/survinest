<template>
  <div class="survival-plan">
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
      <p class="carousel-text">{{ currentKnowledge }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SurvivalPlan',
  setup() {
    // 防災小知識輪播
    const disasterKnowledge = ref([
      '在災難中，保持冷靜並優先確保飲用水的供應。',
      '請記住，食物的保存期限可能會因環境而縮短，定期檢查物資。',
      '學會使用簡單的工具，如打火石和濾水器，能顯著提高生存機率。'
    ])
    const currentKnowledgeIndex = ref(0)
    const currentKnowledge = ref(disasterKnowledge.value[currentKnowledgeIndex.value])

    let knowledgeInterval = null

    const startKnowledgeRotation = () => {
      knowledgeInterval = setInterval(() => {
        currentKnowledgeIndex.value = (currentKnowledgeIndex.value + 1) % disasterKnowledge.value.length
        currentKnowledge.value = disasterKnowledge.value[currentKnowledgeIndex.value]
      }, 2000) // 每5秒切換一次
    }

    const stopKnowledgeRotation = () => {
      clearInterval(knowledgeInterval)
    }

    onMounted(() => {
      startKnowledgeRotation()
    })

    onUnmounted(() => {
      stopKnowledgeRotation()
    })

    return {
      currentKnowledge
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
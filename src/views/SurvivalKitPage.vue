<template>
  <div class="survival-kit-page" :class="{ 'transitioning': isTransitioning }">
    <!-- 人數輸入彈窗 -->
    <Transition name="fade">
      <div v-if="showPeopleInput" class="people-input-overlay">
        <div class="people-input-modal">
          <h2>請輸入家中人數</h2>
          <input
            type="number"
            v-model="peopleCount"
            min="1"
            placeholder="輸入人數"
          />
          <button @click="confirmPeopleCount">確認</button>
        </div>
      </div>
    </Transition>

    <!-- 防災包內容 -->
    <div :class="{ 'content-visible': !showPeopleInput }">
      <!-- 替換切換開關為 icon 按鈕 -->
      <div class="page-switch">
        <button @click="switchToScan" class="icon-button" title="切換到安全掃描功能">
          <span class="scan-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10-10h6v6h-6V4zm0 10h6v6h-6v-6z" fill="#2c3e50"/>
            </svg>
          </span>
          <span class="button-text">安全掃描</span>
        </button>
      </div>

      <!-- 防災包標題與描述 -->
      <div class="kit-header">
        <h1>防災包與緊急物資管理</h1>
        <p>這裡將顯示防災包推薦物品的內容，幫助您在災難中更好地準備。</p>
      </div>

      <!-- 防災物資清單 -->
      <SurvivalPlan />
      <SupplyList />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SurvivalPlan from '@/components/SurvivalPlan.vue'
import SupplyList from '@/components/SupplyList.vue'

export default {
  name: 'SurvivalKitPage',
  components: {
    SurvivalPlan,
    SupplyList
  },
  setup() {
    const router = useRouter()
    const isTransitioning = ref(false)
    const showPeopleInput = ref(true) // 控制是否顯示人數輸入彈窗
    const peopleCount = ref(1) // 儲存輸入的人數

    const confirmPeopleCount = () => {
      if (peopleCount.value > 0) {
        showPeopleInput.value = false // 隱藏彈窗
      } else {
        alert('請輸入有效的人數！')
      }
    }

    const switchToScan = async () => {
      isTransitioning.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push({ name: 'ScanPage' })
    }

    return {
      isTransitioning,
      showPeopleInput,
      peopleCount,
      confirmPeopleCount,
      switchToScan
    }
  }
}
</script>

<style scoped>
.survival-kit-page {
  background: #C7E1DC;
  min-height: 100vh;
  padding: 20px;
  transition: all 0.3s ease;
}

/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.content-visible {
  opacity: 0;
  animation: fadeInContent 2s ease forwards;
  animation-delay: 0.3s; /* 等彈窗淡出後再開始顯示內容 */
}

@keyframes fadeInContent {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.people-input-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #C7E1DC;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.people-input-modal {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.people-input-modal h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
}

.people-input-modal input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.people-input-modal button {
  padding: 12px 24px;
  background: #F4D9B0;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 200px;
}

.people-input-modal button:hover {
  background: #eac89a;
}

/* 新增 icon 按鈕樣式 */
.page-switch {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.icon-button {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #F4D9B0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icon-button:hover {
  background: #eac89a;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.scan-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.scan-icon svg {
  width: 20px;
  height: 20px;
}

.button-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2c3e50;
}

.kit-header {
  text-align: center;
  margin: 30px 0;
}

.kit-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.kit-header p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .kit-header h1 {
    font-size: 1.8rem;
  }
  
  .kit-header p {
    font-size: 1rem;
  }
  
  .people-input-modal {
    padding: 20px;
  }
  
  .people-input-modal button {
    max-width: 180px;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .survival-kit-page {
    padding: 15px;
  }
  
  .kit-header h1 {
    font-size: 1.5rem;
  }
  
  .kit-header p {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .people-input-modal h2 {
    font-size: 1.3rem;
  }
  
  .people-input-modal button {
    max-width: 100%;
    padding: 12px 18px;
    font-size: 0.9rem;
    margin: 0 auto;
    min-height: 44px;
  }
  
  .icon-button {
    padding: 6px 10px;
  }
  
  .button-text {
    font-size: 0.8rem;
  }
  
  .scan-icon svg {
    width: 18px;
    height: 18px;
  }
}

/* 添加過渡效果 */
.transitioning {
  opacity: 0;
  transform: translateY(20px);
}

/* 觸控設備優化 */
@media (hover: none) {
  .people-input-modal button:active,
  .icon-button:active {
    background: #eac89a;
  }
  
  .icon-button:active {
    transform: translateY(0);
  }
}
</style>
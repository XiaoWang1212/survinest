<template>
  <div class="survival-kit-page" :class="{ 'transitioning': isTransitioning }">
    <!-- 人數輸入彈窗 -->
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

    <!-- 防災包內容 -->
    <div v-else>
      <div class="switch-container">
        <input
          type="checkbox"
          id="kitSwitch"
          class="switch-checkbox"
          @change="switchToScan"
          checked
        />
        <label for="kitSwitch" class="switch-label" title="切換到安全掃描功能">
          <span class="switch-button"></span>
        </label>
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
  background: #56A59B;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.people-input-modal button:hover {
  background: #eac89a;
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

/* 新增的響應式設計部分 */
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
    padding: 10px 18px;
    font-size: 0.9rem;
  }
}

/* 添加過渡效果 */
.transitioning {
  opacity: 0;
  transform: translateY(20px);
}

/* 添加到 SurvivalKitPage.vue 的 style 部分 */

/* 已有的按鈕樣式 */
.people-input-modal button {
  padding: 12px 24px;
  background: #F4D9B0;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  width: 100%; /* 使按鈕在移動端填滿容器 */
  max-width: 200px; /* 在桌面端限制寬度 */
}

.people-input-modal button:hover {
  background: #eac89a;
}

/* 添加觸控設備的活躍狀態 */
@media (hover: none) {
  .people-input-modal button:active {
    background: #eac89a;
  }
}

/* 平板響應式設計 */
@media (max-width: 768px) {
  .people-input-modal button {
    max-width: 180px;
    padding: 10px 20px;
  }
  
  /* 修改切換開關的大小 */
  .switch-label {
    width: 60px;
    height: 30px;
  }
  
  .switch-button {
    width: 26px;
    height: 26px;
  }
}

/* 手機響應式設計 */
@media (max-width: 480px) {
  .people-input-modal button {
    max-width: 100%; /* 在手機上讓按鈕填滿 */
    padding: 12px 18px;
    font-size: 0.9rem;
    margin: 0 auto;
  }
  
  /* 縮小切換開關尺寸 */
  .switch-container {
    transform: scale(0.8);
    transform-origin: right top;
  }
  
  /* 確保按鈕在觸控時有足夠的點擊區域 */
  .people-input-modal button {
    min-height: 44px; /* 蘋果建議的最小觸控高度 */
  }
}
</style>
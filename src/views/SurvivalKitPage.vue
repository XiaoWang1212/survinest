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
  background: #C7E1DC; /* 整個頁面背景改為 #C7E1DC */
  min-height: 100vh; /* 確保背景覆蓋整個視窗 */
  padding: 20px; /* 增加內邊距，讓內容不緊貼邊緣 */
}

.people-input-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #C7E1DC; /* 彈窗後面的背景改為 #C7E1DC */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.people-input-modal {
  background: #ffffff; /* 彈窗背景改為白色 */
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 增加陰影效果 */
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
  background: #F4D9B0; /* 確認按鈕改為 #F4D9B0 */
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.people-input-modal button:hover {
  background: #eac89a; /* 按鈕懸停效果 */
}

.kit-header {
  text-align: center; /* 置中對齊 */
  margin: 30px 0; /* 增加上下間距 */
}

.kit-header h1 {
  font-size: 2rem; /* 增大標題字體 */
  color: #2c3e50; /* 深色標題 */
  margin-bottom: 10px;
}

.kit-header p {
  font-size: 1.2rem; /* 增大描述字體 */
  color: #555; /* 中性色描述 */
  line-height: 1.8; /* 增加行距 */
}
</style>
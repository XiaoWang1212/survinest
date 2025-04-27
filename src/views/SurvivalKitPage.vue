<template>
  <div class="language-toggle">
    <button 
      @click="currentLanguage = 'zh'" 
      :class="{ active: currentLanguage === 'zh' }"
    >
      繁體中文
    </button>
    <button 
      @click="currentLanguage = 'en'" 
      :class="{ active: currentLanguage === 'en' }"
    >
      English
    </button>
  </div>

  <!-- 中文版本 -->
  <div class="survival-kit-page" :class="{ 'transitioning': isTransitioning }" v-if="currentLanguage === 'zh'">
    <!-- 人數輸入彈窗 -->
    <div class="switch-container">
      <button class="scan-button" @click="switchToScan" title="切換到安全掃描功能">
        <img src="@/assets/photo/home.jpg" alt="掃描" class="button-image">
      </button>
    </div>
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

  <!-- 英文版本 -->
  <div class="survival-kit-page" :class="{ 'transitioning': isTransitioning }" v-else>
    <!-- 人數輸入彈窗 -->
    <div class="switch-container">
      <button class="scan-button" @click="switchToScan" title="Switch to Safety Scan">
        <img src="@/assets/photo/home.jpg" alt="Scan" class="button-image">
      </button>
    </div>
    <div v-if="showPeopleInput" class="people-input-overlay">
      <div class="people-input-modal">
        <h2>Please enter the number of people in your household</h2>
        <input
          type="number"
          v-model="peopleCount"
          min="1"
          placeholder="Enter number"
        />
        <button @click="confirmPeopleCount">Confirm</button>
      </div>
    </div>

    <!-- 防災包內容 -->
    <div v-else>

      <!-- 防災包標題與描述 -->
      <div class="kit-header">
        <h1>Emergency Kit & Supplies Management</h1>
        <p>Here you'll find recommended emergency supplies to help you better prepare for disasters.</p>
      </div>

      <!-- 防災物資清單 -->
      <SurvivalPlan />
      <SupplyList />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
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
    
    // 語言控制
    const currentLanguage = ref(localStorage.getItem('preferredLanguage') === 'English' ? 'en' : 'zh')

    // 在組件掛載後載入語言偏好
    onMounted(() => {
      // 載入用戶偏好的語言
      const savedLanguage = localStorage.getItem('preferredLanguage')
      if (savedLanguage === 'English') {
        currentLanguage.value = 'en'
      } else {
        currentLanguage.value = 'zh'
      }
    })
    
    // 監聽語言變化
    watch(currentLanguage, (newVal) => {
      localStorage.setItem('preferredLanguage', newVal === 'zh' ? '繁體中文' : 'English')
    })

    const confirmPeopleCount = () => {
      if (peopleCount.value > 0) {
        showPeopleInput.value = false // 隱藏彈窗
      } else {
        if (currentLanguage.value === 'zh') {
          alert('請輸入有效的人數！')
        } else {
          alert('Please enter a valid number!')
        }
      }
    }

    const switchToScan = () => {
      if (isTransitioning.value) return;

      isTransitioning.value = true;

      // 設置動畫結束時的事件處理
      setTimeout(() => {
        router.push({ name: 'ScanPage' });
        // 導航後重設狀態
        isTransitioning.value = false;
      }, 500); // 改為 500ms 與 CSS 動畫時間相符
    };

    return {
      isTransitioning,
      showPeopleInput,
      peopleCount,
      confirmPeopleCount,
      switchToScan,
      currentLanguage
    }
  }
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  margin-top: 70px; /* 新增這行，往下移動 */
  position: relative; /* 新增這行，確保定位正確 */
  z-index: 1001; /* 確保在彈窗之上 */
}

.language-toggle button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.language-toggle button.active {
  background-color: #56A59B;
  color: white;
  border-color: #56A59B;
}

.language-toggle button:hover:not(.active) {
  background-color: #f0f0f0;
}

.survival-kit-page {
  background: #C7E1DC;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  transition: transform 0.5s ease;
  transform: translateX(0); /* 初始位置 */
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

.switch-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.scan-button {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  cursor: pointer;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.scan-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f8f8f8;
}

.scan-button:active {
  transform: scale(0.95);
}

.button-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0;
  pointer-events: none; /* 確保點擊穿透到按鈕 */
}
.transitioning {
  transform: translateX(-100%); /* 改為水平滑動 */
  opacity: 1;
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
@media (max-width: 768px) {
  .scan-button {
    width: 60px;
    height: 60px;
    padding: 10px;
  }
}

@media (max-width: 576px) {
  .scan-button {
    width: 50px;
    height: 50px;
    padding: 8px;
  }
}

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
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
  <Transition name="fade-in" v-if="currentLanguage === 'zh'">
    <div class="scan-page" :class="{ 'slide-out': isSliding }">
      <!-- 頂部導航按鈕 -->
      <div class="switch-container">
        <button class="kit-button" @click="switchToKit" title="切換到防災包功能">
          <img src="@/assets/photo/bag.jpg" alt="防災包" class="button-image">
        </button>
      </div>
      
      <!-- 掃描元件 -->
      <SafetyScan />

      <!-- 分析結果區域 -->
      <div class="results-section">
        <Transition name="result-fade">
          <div class="analysis-result" :class="resultColorClass" v-if="analysisResult">
            <h3>分析結果:</h3>
            <p>{{ analysisResult }}</p>
          </div>
        </Transition>
        
        <!-- 結果圖與按鈕並排顯示 -->
        <div class="result-container">
          <!-- 結果圖 -->
          <div class="result-image">
            <p>這裡是結果圖</p>
          </div>

          <!-- 圖標按鈕組 -->
          <div class="icon-buttons-container">
            <div class="icon-button-group" :style="`animation-delay: ${0.3}s`">
              <button class="icon-button" @click="showEvacuationRoute" title="避難路線">
                <img src="@/assets/photo/run.png" alt="避難路線" class="icon-image" />
              </button>
              <div class="button-label">避難路線</div>
            </div>

            <div class="icon-button-group" :style="`animation-delay: ${0.5}s`">
              <button class="icon-button" @click="showHidingSpots" title="躲避位置">
                <img src="@/assets/photo/hide.png" alt="躲避位置" class="icon-image" />
              </button>
              <div class="button-label">躲避位置</div>
            </div>

            <div class="icon-button-group" :style="`animation-delay: ${0.7}s`">
              <button class="icon-button" @click="showSurvivalKitLocation" title="防災包放置位置">
                <img src="@/assets/photo/kit.png" alt="防災包放置位置" class="icon-image" />
              </button>
              <div class="button-label">防災包位置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  
  <!-- 英文版本 -->
  <Transition name="fade-in" v-else>
    <div class="scan-page" :class="{ 'slide-out': isSliding }">
      <!-- 頂部導航按鈕 -->
      <div class="switch-container">
        <button class="kit-button" @click="switchToKit" title="Switch to Emergency Kit">
          <img src="@/assets/photo/bag.jpg" alt="Emergency Kit" class="button-image">
        </button>
      </div>
      
      <!-- 掃描元件 -->
      <SafetyScan />

      <!-- 分析結果區域 -->
      <div class="results-section">
        <Transition name="result-fade">
          <div class="analysis-result" :class="resultColorClass" v-if="analysisResultEn">
            <h3>Analysis Result:</h3>
            <p>{{ analysisResultEn }}</p>
          </div>
        </Transition>
        
        <!-- 結果圖與按鈕並排顯示 -->
        <div class="result-container">
          <!-- 結果圖 -->
          <div class="result-image">
            <p>Result Image Here</p>
          </div>

          <!-- 圖標按鈕組 -->
          <div class="icon-buttons-container">
            <div class="icon-button-group" :style="`animation-delay: ${0.3}s`">
              <button class="icon-button" @click="showEvacuationRoute" title="Evacuation Route">
                <img src="@/assets/photo/run.png" alt="Evacuation Route" class="icon-image" />
              </button>
              <div class="button-label">Evacuation</div>
            </div>

            <div class="icon-button-group" :style="`animation-delay: ${0.5}s`">
              <button class="icon-button" @click="showHidingSpots" title="Hiding Spots">
                <img src="@/assets/photo/hide.png" alt="Hiding Spots" class="icon-image" />
              </button>
              <div class="button-label">Hiding Spots</div>
            </div>

            <div class="icon-button-group" :style="`animation-delay: ${0.7}s`">
              <button class="icon-button" @click="showSurvivalKitLocation" title="Kit Placement">
                <img src="@/assets/photo/kit.png" alt="Kit Placement Location" class="icon-image" />
              </button>
              <div class="button-label">Kit Location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import SafetyScan from '@/components/SafetyScan.vue';

export default {
  name: 'ScanPage',
  components: {
    SafetyScan,
  },
  setup() {
    const router = useRouter();
    const isTransitioning = ref(false);
    const isSliding = ref(false);
    const uploadedImage = ref(null);
    const analysisResult = ref(null);
    const analysisResultEn = ref(null);
    const pageLoaded = ref(false);
    
    // 語言控制
    const currentLanguage = ref(localStorage.getItem('preferredLanguage') === 'English' ? 'en' : 'zh');

    // 在組件掛載後觸發進入動畫
    onMounted(() => {
      // 載入用戶偏好的語言
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage === 'English') {
        currentLanguage.value = 'en';
      } else {
        currentLanguage.value = 'zh';
      }
      
      // 給一個短暫的延遲，確保 DOM 完全渲染
      setTimeout(() => {
        pageLoaded.value = true;
        
        // 自動顯示初始分析結果，但延遲顯示以讓頁面先載入
        setTimeout(() => {
          if(currentLanguage.value === 'zh') {
            analysisResult.value = '掃描完成：此地區安全風險評級為中等。建議查看避難路線和躲避位置。';
          } else {
            analysisResultEn.value = 'Scan complete: Safety risk level for this area is moderate. Recommend checking evacuation routes and hiding spots.';
          }
        }, 1200);
      }, 100);
      
      console.log('ScanPage component mounted');
    });
    
    // 監聽語言變化
    watch(currentLanguage, (newVal) => {
      localStorage.setItem('preferredLanguage', newVal === 'zh' ? '繁體中文' : 'English');
      
      // 更新對應語言的分析結果
      if(newVal === 'zh') {
        if(analysisResultEn.value?.includes('evacuation')) {
          analysisResult.value = '避難路線已標示：請沿著綠色箭頭方向前進至最近的安全區域。';
        } else if(analysisResultEn.value?.includes('hiding')) {
          analysisResult.value = '躲避位置已標示：藍色區域表示適合躲避的安全位置。';
        } else if(analysisResultEn.value?.includes('kit')) {
          analysisResult.value = '防災包建議放置位置：紅色標記處為建議放置防災包的位置。';
        } else if(analysisResultEn.value) {
          analysisResult.value = '掃描完成：此地區安全風險評級為中等。建議查看避難路線和躲避位置。';
        }
      } else {
        if(analysisResult.value?.includes('避難路線')) {
          analysisResultEn.value = 'Evacuation routes marked: Follow the green arrows to the nearest safe zone.';
        } else if(analysisResult.value?.includes('躲避位置')) {
          analysisResultEn.value = 'Hiding spots marked: Blue areas indicate safe spots suitable for sheltering.';
        } else if(analysisResult.value?.includes('防災包')) {
          analysisResultEn.value = 'Recommended emergency kit placement: Red marks show suggested locations for your emergency kit.';
        } else if(analysisResult.value) {
          analysisResultEn.value = 'Scan complete: Safety risk level for this area is moderate. Recommend checking evacuation routes and hiding spots.';
        }
      }
    });

    // 切換到防災包頁面
    const switchToKit = () => {
      if (isTransitioning.value) return;
      
      isTransitioning.value = true;
      isSliding.value = true;
      
      // 設置動畫結束時的事件處理
      setTimeout(() => {
        router.push({ name: 'SurvivalKitPage' });
        // 導航後重設狀態
        isTransitioning.value = false;
        isSliding.value = false;
      }, 800); // 從 500ms 增加到 800ms，讓動畫有更多時間完成
    };

    // 滾動到結果區域
    const scrollToResult = () => {
      const resultSection = document.querySelector('.analysis-result');
      if (resultSection) {
        const topOffset = 30;
        window.scrollTo({
          top: resultSection.offsetTop - topOffset,
          behavior: 'smooth'
        });
      }
    };

    // 分析上傳的圖片
    const analyzeImage = () => {
      if(currentLanguage.value === 'zh') {
        analysisResult.value = '掃描完成：此地區安全風險評級為中等。建議查看避難路線和躲避位置。';
      } else {
        analysisResultEn.value = 'Scan complete: Safety risk level for this area is moderate. Recommend checking evacuation routes and hiding spots.';
      }
      scrollToResult();
    };

    // 顯示避難路線
    const showEvacuationRoute = () => {
      // 先清空結果，觸發淡入效果
      if(currentLanguage.value === 'zh') {
        analysisResult.value = null;
        // 延遲顯示新結果，創造淡入效果
        setTimeout(() => {
          analysisResult.value = '避難路線已標示：請沿著綠色箭頭方向前進至最近的安全區域。';
          scrollToResult();
        }, 150);
      } else {
        analysisResultEn.value = null;
        setTimeout(() => {
          analysisResultEn.value = 'Evacuation routes marked: Follow the green arrows to the nearest safe zone.';
          scrollToResult();
        }, 150);
      }
    };

    // 顯示躲避位置
    const showHidingSpots = () => {
      if(currentLanguage.value === 'zh') {
        analysisResult.value = null;
        setTimeout(() => {
          analysisResult.value = '躲避位置已標示：藍色區域表示適合躲避的安全位置。';
          scrollToResult();
        }, 150);
      } else {
        analysisResultEn.value = null;
        setTimeout(() => {
          analysisResultEn.value = 'Hiding spots marked: Blue areas indicate safe spots suitable for sheltering.';
          scrollToResult();
        }, 150);
      }
    };

    // 顯示防災包位置
    const showSurvivalKitLocation = () => {
      if(currentLanguage.value === 'zh') {
        analysisResult.value = null;
        setTimeout(() => {
          analysisResult.value = '防災包建議放置位置：紅色標記處為建議放置防災包的位置。';
          scrollToResult();
        }, 150);
      } else {
        analysisResultEn.value = null;
        setTimeout(() => {
          analysisResultEn.value = 'Recommended emergency kit placement: Red marks show suggested locations for your emergency kit.';
          scrollToResult();
        }, 150);
      }
    };

    // 計算屬性：根據分析結果設置底色類名
    const resultColorClass = computed(() => {
      const result = currentLanguage.value === 'zh' ? analysisResult.value : analysisResultEn.value;
      
      if (result?.includes('避難路線') || result?.includes('evacuation')) {
        return 'green';
      } else if (result?.includes('躲避位置') || result?.includes('hiding')) {
        return 'yellow';
      } else if (result?.includes('防災包') || result?.includes('kit')) {
        return 'blue';
      }
      return '';
    });

    return {
      isTransitioning,
      isSliding,
      switchToKit,
      uploadedImage,
      analyzeImage,
      showEvacuationRoute,
      showHidingSpots,
      showSurvivalKitLocation,
      analysisResult,
      analysisResultEn,
      resultColorClass,
      scrollToResult,
      pageLoaded,
      currentLanguage
    };
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}

/* 新增：語言切換按鈕樣式 */
.language-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
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
  background-color: #624444;
  color: white;
  border-color: #624444;
}

.language-toggle button:hover:not(.active) {
  background-color: #f0f0f0;
}

/* 新增：頁面淡入效果 */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 2s ease, transform 1.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 新增：結果淡入效果 */
.result-fade-enter-active,
.result-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.result-fade-enter-from,
.result-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.scan-page {
  min-height: 100vh;
  background-color: rgba(255, 165, 0, 0.1);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
  transition: transform 0.8s ease; /* 從 0.5s 增加到 0.8s */
  padding-top: 35px;
}

/* 滑動動畫樣式 */
.scan-page.slide-out {
  transform: translateX(100%);
}

.switch-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 0;
  animation: fadeInFromTop 1.2s ease forwards; /* 新增：淡入動畫 */
}

@keyframes fadeInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.kit-button {
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

.kit-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f8f8f8;
}

.kit-button:active {
  transform: scale(0.95);
}

.button-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0;
  pointer-events: none;
}

.results-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.analysis-result {
  width: 800px;
  max-width: 90%;
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 80px;
}

.analysis-result.blue {
  background-color: #bad9e4;
}

.analysis-result.yellow {
  background-color: #f5eebc;
}

.analysis-result.green {
  background-color: #c6e3c6;
}

.analysis-result h3 {
  margin-top: 0;
  color: #5D4037;
}

.result-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0; /* 初始不可見 */
  animation: fadeInUp 1.2s ease 0.3s forwards; /* 新增：淡入動畫，延遲0.3秒 */
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-image {
  width: 800px;
  max-width: 90%;
  height: 500px;
  padding: 15px;
  background-color: #ffffff;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.icon-button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  opacity: 0; /* 初始不可見 */
  animation: fadeInRight 1s ease forwards; /* 新增：淡入動畫 */
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.icon-button {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  padding: 8px;
  z-index: 5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-image {
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  background-color: #ffffff;
}

.icon-button:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.icon-button:active {
  transform: scale(0.95);
}

.button-label {
  font-size: 14px;
  font-weight: bold;
  color: #5D4037;
  text-align: center;
  margin-top: 5px;
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .result-container {
    width: 100%;
    max-width: none;
    padding: 0 20px;
  }

  .result-image {
    width: 100%;
    height: 500px;
  }
}

@media (max-width: 992px) {
  .result-container {
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
  }
  
  .result-image {
    width: 100%;
    height: 450px;
    margin-bottom: 20px;
  }

  .icon-buttons-container {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 0;
    margin-top: 20px;
  }

  .icon-button-group {
    flex: 1;
    margin: 0 5px;
  }

  .analysis-result {
    width: 100%;
    max-width: none;
    margin: 15px;
  }
}

@media (max-width: 768px) {
  .scan-page {
    padding: 60px 10px 20px;
  }

  .result-image {
    height: 400px;
  }

  .icon-button {
    width: 50px;
    height: 50px;
  }

  .button-label {
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .scan-page {
    padding: 50px 5px 20px;
  }

  .result-container {
    padding: 0 5px;
  }

  .result-image {
    width: calc(100% + 20px);
    margin-left: -10px;
    margin-right: -10px;
    height: 350px;
    border-radius: 0;
  }

  .icon-buttons-container {
    width: 100%;
    gap: 5px;
    padding: 0 5px;
  }

  .icon-button {
    width: 45px;
    height: 45px;
  }

  .button-label {
    font-size: 11px;
    margin-top: 3px;
  }

  .analysis-result {
    width: calc(100% + 20px);
    margin: 15px -10px;
    border-radius: 0;
    padding: 15px 10px;
  }
}

/* 觸控設備優化 */
@media (hover: none) {
  .kit-button:active,
  .icon-button:active {
    transform: scale(0.95);
    background-color: #f0f0f0;
  }
}
.language-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  margin-top: 70px; /* 新增這行，往下移動 */
  position: relative; /* 新增這行，確保定位正確 */
  z-index: 100; /* 新增這行，確保按鈕可以點擊 */
}
</style>
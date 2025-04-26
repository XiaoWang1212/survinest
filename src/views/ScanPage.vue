<template>
  <div class="scan-page" :class="{ 'slide-out': isSliding }">
    <div class="switch-container">
      <button class="kit-button" @click="switchToKit" title="切換到防災包功能">
        <img src="@/assets/photo/bag.jpg" alt="防災包" class="button-image">
      </button>
    </div>
    <SafetyScan />

    <!-- 分析結果區域 -->
    <div class="results-section">
      <div class="analysis-result" :class="resultColorClass" v-if="analysisResult">
        <h3>分析結果:</h3>
        <p>{{ analysisResult }}</p>
      </div>
      
      <!-- 結果圖與按鈕並排顯示 -->
      <div class="result-container">
        <!-- 結果圖 -->
        <div class="result-image">
          <p>這裡是結果圖</p>
        </div>

        <!-- 圖標按鈕組 -->
        <div class="icon-buttons-container">
          <div class="icon-button-group">
            <button class="icon-button" @click="showEvacuationRoute" title="避難路線">
              <img src="@/assets/photo/run.png" alt="避難路線" class="icon-image" />
            </button>
            <div class="button-label">避難路線</div>
          </div>

          <div class="icon-button-group">
            <button class="icon-button" @click="showHidingSpots" title="躲避位置">
              <img src="@/assets/photo/hide.png" alt="躲避位置" class="icon-image" />
            </button>
            <div class="button-label">躲避位置</div>
          </div>

          <div class="icon-button-group">
            <button class="icon-button" @click="showSurvivalKitLocation" title="防災包放置位置">
              <img src="@/assets/photo/kit.png" alt="防災包放置位置" class="icon-image" />
            </button>
            <div class="button-label">防災包位置</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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
      }, 500); // 500ms 應該與 CSS 動畫時間相符
    };

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

    const analyzeImage = () => {
      analysisResult.value = '掃描完成：此地區安全風險評級為中等。建議查看避難路線和躲避位置。';
      scrollToResult();
    };

    const showEvacuationRoute = () => {
      analysisResult.value = '避難路線已標示：請沿著綠色箭頭方向前進至最近的安全區域。';
      scrollToResult();
    };

    const showHidingSpots = () => {
      analysisResult.value = '躲避位置已標示：藍色區域表示適合躲避的安全位置。';
      scrollToResult();
    };

    const showSurvivalKitLocation = () => {
      analysisResult.value = '防災包建議放置位置：紅色標記處為建議放置防災包的位置。';
      scrollToResult();
    };

    // 計算屬性：根據分析結果設置底色類名
    const resultColorClass = computed(() => {
      if (analysisResult.value?.includes('避難路線')) {
        return 'green';
      } else if (analysisResult.value?.includes('躲避位置')) {
        return 'yellow';
      } else if (analysisResult.value?.includes('防災包')) {
        return 'blue';
      }
      return '';
    });

    // 確保組件加載完成後初始化
    onMounted(() => {
      // 這裡可以添加任何需要在組件掛載後執行的初始化代碼
      console.log('ScanPage component mounted');
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
      resultColorClass,
      scrollToResult,
    };
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.scan-page {
  min-height: 100vh;
  background-color: rgba(255, 165, 0, 0.1);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
  transition: transform 0.5s ease;
  padding-top: 35px; /* 添加頂部內邊距 */
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
  pointer-events: none; /* 確保點擊穿透到按鈕 */
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
  padding: 8px; /* 減少內邊距，讓圖片可以更大 */
  z-index: 5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.icon-image {
  width: 90%; /* 增加圖片尺寸 */
  height: 90%; /* 增加圖片尺寸 */
  object-fit: contain; /* 使用 contain 確保圖片完整顯示 */
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

/* 響應式調整 */
@media (max-width: 1024px) {
  .result-container {
    flex-direction: column;
    align-items: center;
  }
  
  .result-image {
    width: 90%;
    max-width: 100%;
    height: auto;
    min-height: 300px;
  }
  
  .icon-buttons-container {
    flex-direction: row;
    margin-top: 20px;
    gap: 15px;
    width: 90%;
    justify-content: space-around;
  }
}
</style>
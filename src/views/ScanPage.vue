<template>
  <div class="scan-page" :class="{ 'transitioning': isTransitioning }">
    <div class="switch-container">
      <input type="checkbox" id="switch" class="switch-checkbox" @change="switchToKit">
      <label for="switch" class="switch-label" title="切換到防災包功能">
        <span class="switch-button"></span>
      </label>
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
import { ref, computed } from 'vue'; // 添加 computed 的導入
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
    const uploadedImage = ref(null);
    const analysisResult = ref(null);

    const switchToKit = async () => {
      isTransitioning.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: 'SurvivalKitPage' });
    };

    const analyzeImage = () => {
      analysisResult.value =
        '掃描完成：此地區安全風險評級為中等。建議查看避難路線和躲避位置。';
    };

    const showEvacuationRoute = () => {
      analysisResult.value =
        '避難路線已標示：請沿著綠色箭頭方向前進至最近的安全區域。';
    };

    const showHidingSpots = () => {
      analysisResult.value =
        '躲避位置已標示：藍色區域表示適合躲避的安全位置。';
    };

    const showSurvivalKitLocation = () => {
      analysisResult.value =
        '防災包建議放置位置：紅色標記處為建議放置防災包的位置。';
    };

    // 計算屬性：根據分析結果設置底色類名
    const resultColorClass = computed(() => {
      if (analysisResult.value?.includes('避難路線')) {
        return 'green'; // 綠色背景
      } else if (analysisResult.value?.includes('躲避位置')) {
        return 'yellow'; // 黃色背景
      } else if (analysisResult.value?.includes('防災包')) {
        return 'blue'; // 紅色背景
      }
      return ''; // 默認無背景
    });

    return {
      isTransitioning,
      switchToKit,
      uploadedImage,
      analyzeImage,
      showEvacuationRoute,
      showHidingSpots,
      showSurvivalKitLocation,
      analysisResult,
      resultColorClass,
    };
  },
};
</script>
<style scoped>
body {
  overflow-x: hidden; /* 禁止水平滾動 */
}

.scan-page {
  min-height: 100vh;
  background-color: rgba(255, 165, 0, 0.1); /* 淺橙色，透明度 10% */
  position: relative;
  transition: transform 0.5s ease;
  padding-bottom: 50px; /* 增加下方空間 */
  overflow-x: hidden; /* 禁止水平滾動 */
}

.switch-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.switch-checkbox {
  display: none; /* 隱藏 checkbox */
}

.switch-label {
  display: block;
  width: 60px;
  height: 30px;
  background: #e0e0e0;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-label:hover {
  background: #d0d0d0;
}

.switch-button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.switch-checkbox:checked + .switch-label {
  background: #2196F3;
}

.switch-checkbox:checked + .switch-label .switch-button {
  transform: translateX(30px);
}

.results-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.analysis-result {
  width: 800px; /* 與結果圖的寬度一致 */
  max-width: 90%; /* 確保在小螢幕上不會超出容器 */
  margin: 0 0 20px 0;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.analysis-result.blue {
  background-color: #bad9e4; /* 紅色背景 */
}

.analysis-result.yellow {
  background-color: #f5eebc; /* 黃色背景 */
}

.analysis-result.green {
  background-color: #c6e3c6; /* 綠色背景 */
}

.analysis-result h3 {
  margin-top: 0;
  color: #5D4037;
}

.result-container {
  display: flex; /* 水平排列 */
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  gap: 20px; /* 結果圖與按鈕之間的間距 */
  max-width: 800px; /* 與分析結果的寬度一致 */
  margin: 0 auto; /* 在容器中居中 */
}

/* 結果圖樣式 */
.result-image {
  width: 800px; /* 與分析結果的寬度一致 */
  max-width: 90%; /* 確保在小螢幕上不會超出容器 */
  height: 500px; /* 固定高度 */
  padding: 15px; /* 與分析結果的內邊距一致 */
  background-color: #ffffff; /* 白色背景 */
  border: 2px dashed #ddd; /* 與分析結果的邊框樣式一致 */
  border-radius: 8px; /* 圓角與分析結果一致 */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加淺陰影增強視覺效果 */
  text-align: center; /* 確保內容居中 */
}


/* 圖標按鈕組垂直排列在右側 */
.icon-buttons-container {
  display: flex;
  flex-direction: column; /* 按鈕垂直排列 */
  gap: 15px; /* 按鈕之間的間距 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  flex-shrink: 0; /* 防止按鈕區域被壓縮 */
}
.icon-button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px; /* 圖片與文字之間的間距 */
}

.icon-button {
  width: 60px;
  height: 60px;
  background-color: transparent; /* 透明背景 */
  border-radius: 50%; /* 圓形按鈕 */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  padding: 0; /* 移除內邊距，以便圖片能完全填充按鈕 */
  overflow: hidden; /* 確保圖片不會溢出圓形邊框 */
}

.icon-image {
  width: 100%; /* 填滿按鈕 */
  height: 100%; /* 填滿按鈕 */
  object-fit: cover; /* 確保圖片覆蓋整個按鈕區域 */
}

.icon-button:hover {
  background-color: rgba(93, 64, 55, 0.1); /* 淺棕色半透明懸停效果 */
  transform: scale(1.1);
}

.button-label {
  font-size: 14px; /* 調整文字大小 */
  font-weight: bold;
  color: #5D4037; /* 深咖啡色文字 */
  text-align: center;
  margin-top: 5px; /* 與按鈕的間距 */
}

/* 響應式調整 */
@media (max-width: 1024px) {
  .result-container {
    flex-direction: column; /* 在小螢幕上改為垂直排列 */
    align-items: center;
  }
  
  .result-image {
    width: 90%; /* 在小螢幕上寬度增加 */
    max-width: 100%;
    height: auto; /* 小螢幕上高度自適應 */
    min-height: 300px; /* 最小高度 */
  }
  
  .icon-buttons-container {
    flex-direction: row; /* 在小螢幕上按鈕改為水平排列 */
    margin-top: 20px;
    gap: 15px;
    width: 90%;
    justify-content: space-around;
  }
}
</style>
<template>
  <div class="scan-page" :class="{ 'transitioning': isTransitioning }">
    <div class="switch-container">
      <input type="checkbox" id="switch" class="switch-checkbox" @change="switchToKit">
      <label for="switch" class="switch-label" title="切換到防災包功能">
        <span class="switch-button"></span>
      </label>
    </div>
    <h1>我的避難環境</h1>
    <SafetyScan />
    
    <!-- 上傳區 -->
    <div class="upload-section">

      <button class="analyze-button" @click="analyzeImage" :disabled="!uploadedImage">
        執行分析
      </button>
    </div>

    <!-- 新增方形區域和按鈕 -->
    <div class="additional-section">
      <div class="square-area">
        <!-- 方形區域內容 -->
        <p>這裡是放結果的區域你們再另外改大小</p>
      </div>
      <div class="button-group">
        <button class="action-button" @click="showEvacuationRoute">避難路線</button>
        <button class="action-button" @click="showHidingSpots">躲避位置</button>
        <button class="action-button" @click="showSurvivalKitLocation">防災包放置位置</button>
      </div>
    </div>

    <div class="scan-results" v-if="scanResults">
      <h2>環境分析結果</h2>
      <div class="danger-zones">
        <h3>發現的危險區域：</h3>
        <ul>
          <li v-for="(zone, index) in scanResults.dangerZones" :key="index">
            {{ zone.description }}
          </li>
        </ul>
      </div>
      <div class="escape-routes">
        <h3>建議逃生路線：</h3>
        <div class="route-map">
          <!-- 這裡將顯示逃生路線圖 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SafetyScan from '@/components/SafetyScan.vue'

export default {
  name: 'ScanPage',
  components: {
    SafetyScan
  },
  setup() {
    const router = useRouter()
    const isTransitioning = ref(false)
    const scanResults = ref(null)
    const uploadedImage = ref(null)

    const switchToKit = async () => {
      isTransitioning.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push({ name: 'SurvivalKitPage' })
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        uploadedImage.value = URL.createObjectURL(file)
      }
    }

    const analyzeImage = () => {
      if (uploadedImage.value) {
        // 模擬分析過程
        scanResults.value = {
          dangerZones: [
            { description: '靠近窗戶的區域可能有碎玻璃危險' },
            { description: '廚房附近可能有火災風險' }
          ]
        }
      }
    }

    const showEvacuationRoute = () => {
      alert('顯示避難路線')
    }

    const showHidingSpots = () => {
      alert('顯示躲避位置')
    }

    const showSurvivalKitLocation = () => {
      alert('顯示防災包放置位置')
    }

    return {
      isTransitioning,
      switchToKit,
      scanResults,
      uploadedImage,
      handleFileUpload,
      analyzeImage,
      showEvacuationRoute,
      showHidingSpots,
      showSurvivalKitLocation
    }
  }
}
</script>

<style scoped>
.scan-page {
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  transition: transform 0.5s ease;
}

.switch-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.switch-checkbox {
  display: none;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.switch-checkbox:checked + .switch-label {
  background: #2196F3;
}

.scan-page.transitioning {
  animation: slideRight 0.5s ease forwards;
}

@keyframes slideRight {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 100%);
  }
}

.switch-checkbox:checked + .switch-label .switch-button {
  transform: translateX(30px);
}

.upload-section {
  text-align: center;
  margin: 20px 0;
}

.image-preview {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.image-preview img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.analyze-button {
  margin: 20px auto 0; /* 上方間距 20px，置中 */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block; /* 讓按鈕成為區塊元素以便置中 */
}

.analyze-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.additional-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.square-area {
  width: 300px;
  height: 300px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #1976D2;
}
</style>
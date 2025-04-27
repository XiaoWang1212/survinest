<template>
  <div class="safety-scan">
    <div class="scan-header">
      <h1>AI 安全空間掃描</h1>
      <p class="subtitle">上傳您家的照片，讓 AI 辨識危險源與逃生路線</p>
    </div>

    <div class="scan-uploader">
      <div class="upload-container" @click="triggerFileUpload" v-if="!scanInProgress && !imagePreview">
        <div class="upload-icon">📷</div>
        <p>點擊上傳照片或將照片拖放至此處</p>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
      </div>

      <div class="preview-container" v-if="imagePreview && !scanInProgress">
        <img :src="imagePreview" alt="預覽圖" class="preview-image" />
        <div class="preview-actions">
          <button @click="startScan" class="scan-button">開始分析</button>
          <button @click="resetUpload" class="reset-button">重新選擇</button>
        </div>
      </div>

      <div class="scanning-container" v-if="scanInProgress">
        <div class="scanning-animation">
          <div class="scanning-line"></div>
        </div>
        <p>正在分析環境安全性，請稍候...</p>
      </div>
    </div>

    <div class="scan-tips">
      <h3>掃描提示</h3>
      <ul>
        <li>拍攝角度應盡可能展示整個空間</li>
        <li>確保光線充足以便系統識別危險物品</li>
        <li>包含門窗等潛在逃生路線在照片中</li>
        <li>多角度拍攝可提高分析準確度</li>
      </ul>
    </div>
    <div class="furniture-checklist">
      <h3>家具確認清單</h3>
      <div class="checklist-container">
        <label v-for="(item, index) in furnitureItems" 
               :key="index" 
               class="checkbox-item">
          <input type="checkbox" 
                 v-model="checkedFurniture[item.id]">
          <span class="checkmark"></span>
          <span class="label-text">{{ item.name }}</span>
        </label>
      </div>
    </div>
    <div class="confirm-button-container">
        <button class="confirm-button" @click="confirmFurnitureList">
          確認家具清單
        </button>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SafetyScan',
  emits: ['scan-complete'],
  setup(props, { emit }) {
    const fileInput = ref(null)
    const imagePreview = ref(null)
    const scanInProgress = ref(false)

    const triggerFileUpload = () => {
      fileInput.value.click()
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const startScan = async () => {
      scanInProgress.value = true
      
      // 模擬與 Bedrock Nova 的 API 調用
      setTimeout(() => {
        scanInProgress.value = false
        
        // 發出掃描完成事件，附帶結果
        emit('scan-complete', {
          dangerZones: [
            { id: 1, description: '廚房櫃子未固定，地震時可能傾倒', severity: 'high' },
            { id: 2, description: '窗戶旁有重物，地震時可能掉落', severity: 'medium' }
          ],
          escapeRoutes: [
            { id: 1, description: '主要出口：客廳通往大門', safety: 'high' },
            { id: 2, description: '次要出口：陽台逃生梯', safety: 'medium' }
          ],
          safeZones: [
            { id: 1, description: '浴室：堅固結構適合躲避震動' }
          ]
        })
      }, 3000)
    }

    const resetUpload = () => {
      imagePreview.value = null
      fileInput.value.value = ''
    }
    const furnitureItems = [
      { id: 'bed', name: '床（單人床/雙人床）' },
      { id: 'wardrobe', name: '衣櫃' },
      { id: 'desk', name: '書桌、椅子' },
      { id: 'bookshelf', name: '書架、櫃子' },
      { id: 'decoration', name: '掛畫、裝飾物' },
      { id: 'floorLamp', name: '落地燈' },
      { id: 'mirror', name: '鏡子' },
      { id: 'sofa', name: '沙發' },
      { id: 'tv', name: '電視、電視櫃' },
      { id: 'showcase', name: '書櫃、展示櫃' },
      { id: 'coffeeTable', name: '茶几' },
      { id: 'chandelier', name: '吊燈' },
      { id: 'ornaments', name: '擺飾（如花瓶、雕塑）' },
      { id: 'carpet', name: '地毯' },
      { id: 'bathroom', name: '洗手台、馬桶' },
      { id: 'bath', name: '浴缸、淋浴間' },
      { id: 'shelf', name: '置物架' },
      { id: 'bathroomMirror', name: '鏡子' },
      { id: 'waterHeater', name: '熱水器' }
    ];

    const checkedFurniture = ref({});
    furnitureItems.forEach(item => {
      checkedFurniture.value[item.id] = false;
    });

    const confirmFurnitureList = () => {
      // 可以在這裡處理確認後的邏輯
      console.log('已確認的家具:', checkedFurniture.value);
    };


    return {
      fileInput,
      imagePreview,
      scanInProgress,
      triggerFileUpload,
      handleFileUpload,
      startScan,
      resetUpload,
      furnitureItems,
      checkedFurniture,
      confirmFurnitureList
    }
  }
}
</script>

<style scoped>
.scan-header h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #624444;
}
body {
  overflow-x: hidden; /* 禁止水平滾動 */
}
.safety-scan {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.scan-header {
  text-align: center;
  margin-bottom: 30px;
}

.subtitle {
  color: #777;
  font-size: 1.1rem;
  margin-top: 10px;
}

.scan-uploader {
  margin-bottom: 30px;
}

.upload-container {
border: 2px dashed #ddd;
border-radius: 8px;
padding: 40px;
text-align: center;
cursor: pointer;
background-color: #ffffff; /* 預設為白色 */
transition: background-color 0.3s;
}

.upload-container:hover {
background-color: #d2b48c; /* 靠近時變為淺咖啡色 */
}

.upload-icon {
font-size: 48px;
margin-bottom: 15px;
}

.preview-container {
text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.scan-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button {
  background-color: #7f8c8d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.scanning-container {
  padding: 40px;
  text-align: center;
}

.scanning-animation {
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
}

.scanning-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #2ecc71;
  animation: scan 2s infinite;
}


.furniture-checklist {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.furniture-checklist h3 {
  color: #624444;
  margin-bottom: 20px;
  text-align: center;
}

.checklist-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 10px;
}
.checkbox-item {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;
}

.checkbox-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #fff;
  border: 2px solid #624444;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.checkbox-item:hover input ~ .checkmark {
  background-color: #f5f5f5;
}

.checkbox-item input:checked ~ .checkmark {
  background-color: #624444;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-item input:checked ~ .checkmark:after {
  display: block;
}

.label-text {
  margin-left: 8px;
  color: #333;
}
.confirm-button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.confirm-button {
  background-color: #2c3e50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-button:hover {
  background-color: #1a242f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.confirm-button:active {
  transform: translateY(0);
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 200px; }
}

.scan-tips {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.scan-tips ul {
  padding-left: 20px;
}

.scan-tips li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .checklist-container {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .checkbox-item {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .checklist-container {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .checkbox-item {
    font-size: 0.8rem;
  }

  .checkmark {
    height: 20px;
    width: 20px;
  }
}
@media (max-width: 768px) {
  .confirm-button {
    padding: 10px 25px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .confirm-button {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}

</style>
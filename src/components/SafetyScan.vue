<template>
  <div class="safety-scan">
    <div class="scan-header">
      <h1>AI 安全空間掃描</h1>
      <p class="subtitle">上傳您家的照片，讓 AI 辨識危險源與逃生路線</p>
    </div>

    <div class="scan-uploader">
      <div class="upload-container" @click="triggerFileUpload" v-if="!scanInProgress && !imagePreview && !generatedImage">
        <div class="upload-icon">📷</div>
        <p>點擊上傳照片或將照片拖放至此處</p>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
      </div>

      <div class="preview-container" v-if="imagePreview && !scanInProgress && !generatedImage">
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
        <p>{{ scanningMessage }}</p>
      </div>
      
      <!-- 添加生成的參考圖片顯示區域 -->
      <div class="generated-image-container" v-if="generatedImage">
        <h3>AI 生成的安全布置參考</h3>
        <img :src="generatedImage" alt="AI生成的安全布置參考" class="generated-image" />
        <p class="reference-description">此參考圖展示了理想的居家安全布置，紅色緊急背包置於門口附近便於快速拿取</p>
        <div class="preview-actions">
          <button @click="resetAll" class="reset-button">返回</button>
        </div>
      </div>
    </div>

    <div class="scan-options" v-if="!scanInProgress && !generatedImage">
      <h3>選擇操作</h3>
      <div class="options-container">
        <button class="option-button upload-option" @click="triggerFileUpload">
          <div class="option-icon">📷</div>
          <div class="option-text">
            <h4>上傳照片分析</h4>
            <p>分析您家的安全狀況</p>
          </div>
        </button>
        
        <button class="option-button generate-option" @click="generateSafetyReference">
          <div class="option-icon">🏠</div>
          <div class="option-text">
            <h4>生成安全布置參考</h4>
            <p>查看理想的安全布置方案</p>
          </div>
        </button>
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
    const scanningMessage = ref('正在分析環境安全性，請稍候...')
    const generatedImage = ref(null)

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

    const resetUpload = () => {
      imagePreview.value = null
      if (fileInput.value) fileInput.value.value = ''
    }
    
    const resetAll = () => {
      imagePreview.value = null
      generatedImage.value = null
      if (fileInput.value) fileInput.value.value = ''
    }

    const startScan = async () => {
      scanInProgress.value = true
      scanningMessage.value = '正在分析環境安全性，請稍候...'
      
      // 模擬與 API 的調用
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
    
    const generateSafetyReference = async () => {
      scanInProgress.value = true
      scanningMessage.value = '正在生成安全布置參考圖，請稍候...'
      
      try {
        // 根據環境選擇正確的 API URL
        const isAmplify = window.location.hostname.includes("amplifyapp.com")
        const apiUrl = isAmplify
      ? "https://t1lwim1as7.execute-api.us-west-2.amazonaws.com/dev"
      : "scanapi"

        console.log("發送請求到:", apiUrl)
        
        // 使用與營養計算相同的 API 端點，但傳送不同的 body
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bucket: "photo-analysisbucket",
            outputKey: "gen-img/generated_titan.png",
            prompt: "the element include:table,television,chair,sofa.and A wide-angle view of a realistic modern living room, showing the main entrance door clearly. A red emergency backpack is placed near the door, blending naturally into the scene. The room is bright and detailed, with furniture and decorations visible."
          }),
        })

        console.log("API 響應狀態:", response.status)

        if (!response.ok) {
          throw new Error(`服務器錯誤 (${response.status})`)
        }

        // 使用與 SupplyList 組件相同的解析方法
        const responseText = await response.text()
        console.log("原始響應:", responseText)

        // 解析回應
        let data
        try {
          data = JSON.parse(responseText)
          console.log("解析後的數據:", data)

          // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
          if (data.body && typeof data.body === "string") {
            try {
              data = JSON.parse(data.body)
              console.log("從 body 中解析的數據:", data)
            } catch (nestedJsonError) {
              console.error("解析嵌套 JSON 錯誤:", nestedJsonError)
              throw nestedJsonError
            }
          }
          
          // 如果成功，顯示生成的圖片
          if (data.imageUrl) {
            generatedImage.value = data.imageUrl
          } else {
            // 如果沒有返回 imageUrl，使用模擬圖片
            generatedImage.value = "https://demo-bucket.s3.amazonaws.com/safety-reference.jpg"
          }
          
        } catch (jsonError) {
          console.error("JSON 解析錯誤:", jsonError)
          // 使用備用圖片
          generatedImage.value = "https://demo-bucket.s3.amazonaws.com/safety-reference.jpg"
        }
        
      } catch (error) {
        console.error("API 調用失敗:", error)
        // 使用備用圖片
        generatedImage.value = "https://demo-bucket.s3.amazonaws.com/safety-reference.jpg"
      } finally {
        scanInProgress.value = false
      }
    }

    return {
      fileInput,
      imagePreview,
      scanInProgress,
      scanningMessage,
      generatedImage,
      triggerFileUpload,
      handleFileUpload,
      startScan,
      resetUpload,
      resetAll,
      generateSafetyReference
    }
  }
}
</script>

<style scoped>
/* 保留原有樣式 */
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
  </style>
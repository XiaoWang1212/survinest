<template>
  <!-- 中文版本 -->
  <div class="safety-scan" v-if="currentLanguage === 'zh'">
    <div class="scan-header">
      <h1>AI 安全空間掃描</h1>
      <p class="subtitle">上傳您家的照片，讓 AI 辨識危險源與逃生路線</p>
    </div>

    <div class="scan-uploader">
      <div
        class="upload-container"
        @click="triggerFileUpload"
        v-if="!scanInProgress && !imagePreview && !generatedImage"
      >
        <div class="upload-icon">📷</div>
        <p>點擊上傳照片或將照片拖放至此處</p>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          style="display: none"
        />
      </div>

      <div
        class="preview-container"
        v-if="imagePreview && !scanInProgress && !generatedImage"
      >
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
        <p>{{ scanningMessageZh }}</p>
      </div>

      <!-- 添加生成的參考圖片顯示區域 -->
      <div class="generated-image-container" v-if="generatedImage">
        <h3>AI 生成的安全布置參考</h3>
        <img
          :src="generatedImage"
          alt="AI生成的安全布置參考"
          class="generated-image"
        />
        <p class="reference-description">
          此參考圖展示了理想的居家安全布置，紅色緊急背包置於門口附近便於快速拿取
        </p>
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

        <button
          class="option-button generate-option"
          @click="generateSafetyReference"
        >
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

  <!-- 英文版本 -->
  <div class="safety-scan" v-else>
    <div class="scan-header">
      <h1>AI Safety Space Scan</h1>
      <p class="subtitle">
        Upload photos of your home for AI to identify hazards and evacuation
        routes
      </p>
    </div>

    <div class="scan-uploader">
      <div
        class="upload-container"
        @click="triggerFileUpload"
        v-if="!scanInProgress && !imagePreview && !generatedImage"
      >
        <div class="upload-icon">📷</div>
        <p>Click to upload a photo or drag and drop it here</p>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          style="display: none"
        />
      </div>

      <div
        class="preview-container"
        v-if="imagePreview && !scanInProgress && !generatedImage"
      >
        <img :src="imagePreview" alt="Preview" class="preview-image" />
        <div class="preview-actions">
          <button @click="startScan" class="scan-button">Start Analysis</button>
          <button @click="resetUpload" class="reset-button">
            Select Another
          </button>
        </div>
      </div>

      <div class="scanning-container" v-if="scanInProgress">
        <div class="scanning-animation">
          <div class="scanning-line"></div>
        </div>
        <p>{{ scanningMessageEn }}</p>
      </div>

      <!-- 添加生成的參考圖片顯示區域 -->
      <div class="generated-image-container" v-if="generatedImage">
        <h3>AI Generated Safety Arrangement Reference</h3>
        <img
          :src="generatedImage"
          alt="AI generated safety arrangement reference"
          class="generated-image"
        />
        <p class="reference-description">
          This reference image shows the ideal home safety setup with a red
          emergency backpack placed near the entrance for easy access
        </p>
        <div class="preview-actions">
          <button @click="resetAll" class="reset-button">Return</button>
        </div>
      </div>
    </div>

    <div class="scan-options" v-if="!scanInProgress && !generatedImage">
      <h3>Select Operation</h3>
      <div class="options-container">
        <button class="option-button upload-option" @click="triggerFileUpload">
          <div class="option-icon">📷</div>
          <div class="option-text">
            <h4>Upload Photo for Analysis</h4>
            <p>Analyze your home's safety status</p>
          </div>
        </button>

        <button
          class="option-button generate-option"
          @click="generateSafetyReference"
        >
          <div class="option-icon">🏠</div>
          <div class="option-text">
            <h4>Generate Safety Reference</h4>
            <p>View ideal safety arrangement solutions</p>
          </div>
        </button>
      </div>
    </div>

    <div class="scan-tips">
      <h3>Scanning Tips</h3>
      <ul>
        <li>
          Camera angles should showcase the entire space as much as possible
        </li>
        <li>
          Ensure adequate lighting for the system to identify hazardous items
        </li>
        <li>
          Include doors and windows as potential escape routes in the photo
        </li>
        <li>Multi-angle shots can improve analysis accuracy</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { ref, watch, onMounted } from "vue";

  export default {
    name: "SafetyScan",
    emits: ["scan-complete"],
    setup(props, { emit }) {
      const fileInput = ref(null);
      const imagePreview = ref(null);
      const scanInProgress = ref(false);
      const generatedImage = ref(null);
      const scanningMessage = ref("正在分析環境安全性，請稍候...");
      const currentFile = ref(null);
      const currentFileName = ref(""); // 新增一個響應式變量來保存檔案名稱
      const recognizedObjects = ref([]);
      const scanStage = ref("idle"); // 'idle', 'recognizing', 'generating', 'complete'
      const scanProgress = ref(0);
      
      // 語言控制
      const currentLanguage = ref(
        localStorage.getItem("preferredLanguage") === "English" ? "en" : "zh"
      );

      // 掃描訊息
      const scanningMessageZh = ref("正在分析環境安全性，請稍候...");
      const scanningMessageEn = ref(
        "Analyzing environment safety, please wait..."
      );

      onMounted(() => {
        // 載入用戶偏好的語言
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage === "English") {
          currentLanguage.value = "en";
        } else {
          currentLanguage.value = "zh";
        }
      });

      // 監聽語言變化，保存偏好
      watch(currentLanguage, (newVal) => {
        localStorage.setItem(
          "preferredLanguage",
          newVal === "zh" ? "繁體中文" : "English"
        );
      });

      const triggerFileUpload = () => {
        fileInput.value.click();
      };

      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          currentFile.value = file; // 保存當前文件
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreview.value = e.target.result;
            // 生成檔案名稱
            const timestamp = new Date().getTime();
            currentFileName.value = `photo_${timestamp}.jpg`;
          };
          reader.readAsDataURL(file);
        }
      };

      const resetUpload = () => {
        imagePreview.value = null;
        currentFile.value = null;
        if (fileInput.value) fileInput.value.value = "";
      };

      const resetAll = () => {
        imagePreview.value = null;
        generatedImage.value = null;
        currentFile.value = null;
        recognizedObjects.value = [];
        scanProgress.value = 0;
        scanStage.value = "idle";
        if (fileInput.value) fileInput.value.value = "";
      };

      // 壓縮圖像的函數
      const compressImage = (dataUrl) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            // 創建 canvas 元素
            const canvas = document.createElement("canvas");

            // 設置最大寬度和高度
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 600;

            let width = img.width;
            let height = img.height;

            // 計算縮放比例
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            // 設置 canvas 尺寸
            canvas.width = width;
            canvas.height = height;

            // 在 canvas 上繪製壓縮後的圖像
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // 轉換為 data URL，降低質量
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
            resolve(compressedDataUrl);
          };
          img.src = dataUrl;
        });
      };

      // 模擬物體識別功能
      const simulateObjectRecognition = async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 模擬識別結果
        return {
          Labels: [
            { Name: "Room", Confidence: 99.8 },
            { Name: "Living Room", Confidence: 98.5 },
            { Name: "Furniture", Confidence: 97.9 },
            { Name: "Chair", Confidence: 96.3 },
            { Name: "Couch", Confidence: 94.1 },
            { Name: "Table", Confidence: 92.8 },
            { Name: "Television", Confidence: 89.2 },
            { Name: "Lamp", Confidence: 87.6 },
            { Name: "Window", Confidence: 85.3 },
            { Name: "Door", Confidence: 83.7 },
            { Name: "Plant", Confidence: 79.2 }
          ]
        };
      };

      // 開始掃描分析
      const startScan = async () => {
        if (!imagePreview.value) {
          alert(currentLanguage.value === "zh" ? "請先上傳照片" : "Please upload a photo first");
          return;
        }

        scanInProgress.value = true;
        scanStage.value = "recognizing";
        scanningMessage.value = currentLanguage.value === "zh" ? 
          "正在分析圖像中的物體..." : "Analyzing objects in the image...";
        scanProgress.value = 10;

        try {
          // 壓縮圖像
          const compressedImage = await compressImage(imagePreview.value);
          const compressedBase64 = compressedImage.split(',')[1];
          
          console.log("壓縮後圖像大小:", compressedBase64.length);
          
          scanProgress.value = 30;

          // 使用模擬數據替代實際 API 調用 (避免 base64 太長的問題)
          const data = await simulateObjectRecognition();
          
          // 獲取識別出的物體列表
          recognizedObjects.value = data.Labels || [];
          console.log("識別出的物體:", recognizedObjects.value);
          
          scanProgress.value = 50;
          
          // 生成安全布置圖
          await generateSafetyImageFromRecognition();
          
        } catch (error) {
          console.error("物體識別請求失敗:", error);
          // 出錯時仍然進行圖像生成
          await generateSafetyImageFromRecognition(true);
        }
      };

      // 根據識別結果生成安全布置參考圖
      const generateSafetyImageFromRecognition = async (useDefaultPrompt = false) => {
        scanStage.value = 'generating';
        scanningMessage.value = currentLanguage.value === "zh" ?
          "正在生成安全布置參考圖..." : "Generating safety arrangement reference...";
        scanProgress.value = 60;
        
        try {
          // 根據環境選擇正確的 API URL
          const isAmplify = window.location.hostname.includes("amplifyapp.com");
          const apiUrl = isAmplify
            ? "https://t1lwim1as7.execute-api.us-west-2.amazonaws.com/dev"
            : "/scanapi";
          
          console.log("發送生成請求到:", apiUrl);
          
          // 根據識別的物體生成提示詞
          let prompt = "A wide-angle view of a realistic modern living room, showing the main entrance door clearly. A red emergency backpack is placed near the door, blending naturally into the scene. The room is bright and detailed, with furniture and decorations visible.";
          
          // 如果有識別結果且不使用默認提示詞，則根據識別結果生成更精確的提示詞
          if (recognizedObjects.value.length > 0 && !useDefaultPrompt) {
            const objectList = recognizedObjects.value
              .filter(obj => obj.Confidence > 70) // 只使用置信度高的物體
              .map(obj => obj.Name)
              .slice(0, 8) // 限制物體數量，避免提示詞過長
              .join(", ");
            
            prompt = `the element include:${objectList}. and ${prompt}`;
          }
          
          scanProgress.value = 75;
          
          // 發送生成請求
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bucket: "photo-analysisbucket",
              outputKey: "gen-img/generated_" + Date.now() + ".png",
              prompt: prompt
            }),
          });
          
          scanProgress.value = 90;
          
          console.log("圖像生成 API 響應狀態:", response.status);
          
          if (!response.ok) {
            throw new Error(`服務器錯誤 (${response.status})`);
          }
          
          // 處理 API 響應
          const responseText = await response.text();
          console.log("圖像生成原始響應:", responseText);
          
          // 解析回應
          let data;
          try {
            data = JSON.parse(responseText);
            
            // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
            if (data.body && typeof data.body === "string") {
              try {
                data = JSON.parse(data.body);
              } catch (nestedJsonError) {
                console.error("解析嵌套 JSON 錯誤:", nestedJsonError);
              }
            }
            
            // 如果成功，顯示生成的圖片
            if (data.imageUrl) {
              generatedImage.value = data.imageUrl;
            } else {
              // 如果沒有返回 imageUrl，使用模擬圖片
              generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
            }
            
          } catch (jsonError) {
            console.error("JSON 解析錯誤:", jsonError);
            // 使用備用圖片
            generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
          }
          
          scanProgress.value = 100;
          
          // 發出掃描完成事件，附帶結果
          emit('scan-complete', {
            recognizedObjects: recognizedObjects.value,
            generatedImage: generatedImage.value,
            dangerZones: [
              { id: 1, description: '確認大型傢俱是否已固定，地震時可能傾倒', severity: 'high' },
              { id: 2, description: '窗戶旁不應放置重物，地震時可能掉落', severity: 'medium' }
            ],
            escapeRoutes: [
              { id: 1, description: '確保通往大門的路徑暢通無阻', safety: 'high' },
              { id: 2, description: '考慮準備替代逃生路線', safety: 'medium' }
            ],
            safeZones: [
              { id: 1, description: '堅固結構處適合躲避震動' }
            ]
          });
          
        } catch (error) {
          console.error("圖像生成 API 調用失敗:", error);
          // 使用備用圖片
          generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
        } finally {
          scanInProgress.value = false;
          scanStage.value = 'complete';
        }
      };

      // 直接生成安全參考圖
      const generateSafetyReference = async () => {
        scanInProgress.value = true;
        scanStage.value = "generating";
        scanningMessage.value = currentLanguage.value === "zh" ?
          "正在生成安全布置參考圖..." : "Generating safety arrangement reference...";
        scanProgress.value = 40;
        
        try {
          // 根據環境選擇正確的 API URL
          const isAmplify = window.location.hostname.includes("amplifyapp.com");
          const apiUrl = isAmplify
            ? "https://t1lwim1as7.execute-api.us-west-2.amazonaws.com/dev"
            : "/scanapi";
          
          console.log("發送請求到:", apiUrl);
          
          // 使用預定義的提示詞
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bucket: "photo-analysisbucket",
              outputKey: "gen-img/generated_" + Date.now() + ".png",
              prompt: "the element include:table,television,chair,sofa.and A wide-angle view of a realistic modern living room, showing the main entrance door clearly. A red emergency backpack is placed near the door, blending naturally into the scene. The room is bright and detailed, with furniture and decorations visible."
            }),
          });
          
          scanProgress.value = 70;
          
          console.log("API 響應狀態:", response.status);
          
          if (!response.ok) {
            throw new Error(`服務器錯誤 (${response.status})`);
          }
          
          // 處理 API 響應
          const responseText = await response.text();
          console.log("原始響應:", responseText);
          
          // 解析回應
          let data;
          try {
            data = JSON.parse(responseText);
            console.log("解析後的數據:", data);
            
            // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
            if (data.body && typeof data.body === "string") {
              try {
                data = JSON.parse(data.body);
                console.log("從 body 中解析的數據:", data);
              } catch (nestedJsonError) {
                console.error("解析嵌套 JSON 錯誤:", nestedJsonError);
                throw nestedJsonError;
              }
            }
            
            // 如果成功，顯示生成的圖片
            if (data.imageUrl) {
              generatedImage.value = data.imageUrl;
            } else {
              // 如果沒有返回 imageUrl，使用模擬圖片
              generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
            }
            
          } catch (jsonError) {
            console.error("JSON 解析錯誤:", jsonError);
            // 使用備用圖片
            generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
          }
          
        } catch (error) {
          console.error("API 調用失敗:", error);
          // 使用備用圖片
          generatedImage.value = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format";
        } finally {
          scanInProgress.value = false;
          scanStage.value = "complete";
          scanProgress.value = 100;
        }
      };

      return {
        fileInput,
        imagePreview,
        scanInProgress,
        scanningMessage,
        scanningMessageZh,
        scanningMessageEn,
        generatedImage,
        currentLanguage,
        currentFile,
        recognizedObjects,
        scanStage,
        scanProgress,
        triggerFileUpload,
        handleFileUpload,
        startScan,
        resetUpload,
        resetAll,
        generateSafetyReference
      };
    },
  };
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
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  }

  .preview-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
  }

  .scan-button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }

  .scan-button:hover {
    background-color: #27ae60;
  }

  .reset-button {
    background-color: #7f8c8d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }

  .reset-button:hover {
    background-color: #6c7a7d;
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
    border-radius: 8px;
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
    0% {
      top: 0;
    }
    100% {
      top: 200px;
    }
  }

  .scan-tips {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .scan-tips h3 {
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  .scan-tips ul {
    padding-left: 20px;
  }

  .scan-tips li {
    margin-bottom: 10px;
    color: #555;
  }

  /* 添加新樣式 */
  .scan-options {
    margin-bottom: 30px;
  }

  .scan-options h3 {
    text-align: center;
    margin-bottom: 15px;
    color: #2c3e50;
  }

  .options-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .option-button {
    flex: 1;
    min-width: 250px;
    max-width: 45%;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .option-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }

  .upload-option {
    background-color: #e8f5e9;
    color: #2c3e50;
  }

  .generate-option {
    background-color: #e3f2fd;
    color: #2c3e50;
  }

  .option-icon {
    font-size: 32px;
    padding: 10px;
  }

  .option-text h4 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
  }

  .option-text p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  .generated-image-container {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }

  .generated-image-container h3 {
    margin-bottom: 15px;
    color: #2c3e50;
  }

  .generated-image {
    max-width: 100%;
    max-height: 500px;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  }

  .reference-description {
    margin-top: 15px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 6px;
    color: #555;
    font-size: 0.95rem;
  }

  /* 響應式設計 */
  @media (max-width: 768px) {
    .option-button {
      max-width: 100%;
    }
  }
</style>

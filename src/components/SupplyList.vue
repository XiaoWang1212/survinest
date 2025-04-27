<template>
  <div class="supply-list">
    <div class="supply-header">
      <h1>防災物資清單</h1>
      <p class="subtitle">選擇並儲存您的防災物資</p>
    </div>

    <!-- 類別切換按鈕 -->
    <div class="category-tabs">
      <button
        :class="['tab-button', { active: activeCategory === 'food' }]"
        @click="activeCategory = 'food'"
      >
        食物
      </button>
      <button
        :class="['tab-button', { active: activeCategory === 'supplies' }]"
        @click="activeCategory = 'supplies'"
      >
        用品
      </button>
    </div>

    <!-- 食物區塊 -->
    <div v-if="activeCategory === 'food'" class="food-section">
      <!-- 食物清單 -->
      <div class="food-items">
        <h2>食物清單</h2>
        <div
          v-for="item in suppliesByCategory.food"
          :key="item.id"
          class="list-item"
        >
          <label class="checkbox-label">
            <input type="checkbox" v-model="checkedItems[item.id]" />
            <div class="item-content">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- 食物需求分析 - 直接顯示在下方 -->
      <div class="food-analysis">
        <h2>食物需求分析</h2>
        <p>上傳照片並輸入您的資訊，系統將根據現有物資提供每日食物分配建議。</p>

        <!-- 上傳照片 -->
        <div class="upload-section">
          <h3>上傳照片</h3>
          <p class="hint-text">拍攝您目前的食物內容物</p>
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="file-input"
          />
          <div v-if="uploadedImage" class="uploaded-image">
            <img :src="uploadedImage" alt="上傳的照片" />
          </div>
        </div>

        <!-- 輸入使用者資訊 -->
        <div class="user-info-section">
          <h3>輸入您的資訊</h3>
          <div class="form-group">
            <label>年齡：</label>
            <input type="number" v-model="userInfo.age" min="0" />
          </div>

          <div class="form-group">
            <label>性別：</label>
            <select v-model="userInfo.gender">
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>

          <div class="form-group">
            <label>身高 (cm)：</label>
            <input type="number" v-model="userInfo.height" min="0" />
          </div>

          <div class="form-group">
            <label>體重 (kg)：</label>
            <input type="number" v-model="userInfo.weight" min="0" />
          </div>

          <button @click="calculateSuggestions" class="calculate-button">
            計算建議
          </button>
        </div>

        <!-- 顯示建議 -->
        <div v-if="suggestions" class="suggestions-section">
          <h3>每日飲食建議</h3>
          <p
            v-if="suggestions && Object.keys(suggestions).length > 0"
            class="success-message"
          >
            計算成功！以下是您的個人化飲食建議
          </p>

          <div class="suggestion-card">
            <!-- 添加 BMR 和 TDEE 顯示 -->
            <div class="metabolism-info">
              <div class="info-item">
                <div class="info-label">基礎代謝率 (BMR):</div>
                <div class="info-value">{{ suggestions.bmr }} 大卡/天</div>
              </div>
              <div class="info-item">
                <div class="info-label">總熱量消耗 (TDEE):</div>
                <div class="info-value">{{ suggestions.tdee }} 大卡/天</div>
              </div>
            </div>

            <p class="calories">
              每餐建議熱量：<span>{{ suggestions.caloriesPerMeal }}</span> 大卡
            </p>
            <button @click="analyzeNutrition" class="analyze-button">
              分析營養需求
            </button>
            <div v-if="nutritionAnalysis" class="nutrition-analysis-section">
              <p>每日食物分配：</p>
              <h3>災難時期營養需求分析</h3>
              <div class="analysis-card">
                <div v-if="nutritionAnalysis.loading" class="loading-container">
                  <div class="loading-spinner"></div>
                  <p>正在分析營養需求...</p>
                </div>
                <div v-else class="nutrition-content">
                  <p class="instruction-title">
                    建議保存以下食物以滿足營養需求:
                  </p>
                  <div
                    class="nutrition-text"
                    v-html="formattedNutritionText"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用品清單 -->
    <div v-else class="supply-categories">
      <!-- 保暖衣物 -->
      <div class="category">
        <h2>保暖衣物</h2>
        <div
          v-for="item in suppliesByCategory.clothing"
          :key="item.id"
          class="list-item"
        >
          <label class="checkbox-label">
            <input type="checkbox" v-model="checkedItems[item.id]" />
            <div class="item-content">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- 個人醫藥用品 -->
      <div class="category">
        <h2>個人醫藥用品</h2>
        <div
          v-for="item in suppliesByCategory.medical"
          :key="item.id"
          class="list-item"
        >
          <label class="checkbox-label">
            <input type="checkbox" v-model="checkedItems[item.id]" />
            <div class="item-content">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- 重要物品 -->
      <div class="category">
        <h2>重要物品</h2>
        <div
          v-for="item in suppliesByCategory.important"
          :key="item.id"
          class="list-item"
        >
          <label class="checkbox-label">
            <input type="checkbox" v-model="checkedItems[item.id]" />
            <div class="item-content">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- 其他工具類 -->
      <div class="category">
        <h2>其他工具類</h2>
        <div
          v-for="item in suppliesByCategory.tools"
          :key="item.id"
          class="list-item"
        >
          <label class="checkbox-label">
            <input type="checkbox" v-model="checkedItems[item.id]" />
            <div class="item-content">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <button class="save-button" @click="saveChecklist">儲存清單</button>
  </div>
</template>

<script>
  import { ref, computed, onMounted } from "vue"; // 移除 watch 引入

  export default {
    name: "SupplyList",
    setup() {
      const activeCategory = ref("food"); // 預設顯示「食物」
      const checkedItems = ref({}); // 儲存勾選狀態
      const uploadedImage = ref(null); // 儲存上傳的照片
      const userInfo = ref({
        age: null,
        gender: "male",
        height: null,
        weight: null,
      }); // 使用者資訊
      const suggestions = ref(null); // 儲存建議結果
      const nutritionAnalysis = ref(null); // 儲存營養分析結果
      
      // 語言控制
      const currentLanguage = ref(localStorage.getItem('preferredLanguage') === 'English' ? 'en' : 'zh');

      // 在組件掛載後載入語言偏好
      onMounted(() => {
        // 載入用戶偏好的語言
        const savedLanguage = localStorage.getItem('preferredLanguage')
        if (savedLanguage === 'English') {
          currentLanguage.value = 'en'
        } else {
          currentLanguage.value = 'zh'
        }
        
        // 定義事件處理函數，以便移除時能夠引用相同的函數
        const handleStorageChange = (event) => {
          if (event.key === 'preferredLanguage') {
            currentLanguage.value = event.newValue === 'English' ? 'en' : 'zh'
          }
        }
        
        // 添加事件監聽器
        window.addEventListener('storage', handleStorageChange)
        
        // 組件卸載時移除事件監聽器
        return () => {
          window.removeEventListener('storage', handleStorageChange)
        }
      });

      // 中文物品清單
      const supplies = [
        // 食物
        {
          id: 1,
          name: "飲用水",
          description: "每人每天至少3公升，建議儲存3天份量",
          category: "food",
          priority: "high",
        },
        {
          id: 2,
          name: "防災食品",
          description: "高熱量、易保存的食品，注意保存期限",
          category: "food",
          priority: "high",
        },
        {
          id: 3,
          name: "乾糧",
          description: "輕便且易保存的乾糧",
          category: "food",
          priority: "medium",
        },

        // 保暖衣物
        {
          id: 4,
          name: "暖暖包",
          description: "用於寒冷環境下保暖",
          category: "clothing",
          priority: "high",
        },
        {
          id: 5,
          name: "衣服",
          description: "多準備一套乾淨衣物",
          category: "clothing",
          priority: "medium",
        },
        {
          id: 6,
          name: "小被子",
          description: "輕便且保暖的小被子",
          category: "clothing",
          priority: "medium",
        },

        // 個人醫藥用品
        {
          id: 7,
          name: "急救箱",
          description: "包含繃帶、紗布、消毒藥水等基本醫療用品",
          category: "medical",
          priority: "high",
        },
        {
          id: 8,
          name: "藥品",
          description: "個人常用藥品，如感冒藥、止痛藥等",
          category: "medical",
          priority: "high",
        },

        // 重要物品
        {
          id: 9,
          name: "少許現金",
          description: "用於緊急情況下的交易",
          category: "important",
          priority: "high",
        },
        {
          id: 10,
          name: "證件影本",
          description: "身份證、護照等重要證件的影本",
          category: "important",
          priority: "high",
        },

        // 其他工具類
        {
          id: 11,
          name: "手電筒",
          description: "建議使用LED手電筒，耗電量低且亮度高",
          category: "tools",
          priority: "high",
        },
        {
          id: 12,
          name: "哨子",
          description: "用於求救信號",
          category: "tools",
          priority: "medium",
        },
        {
          id: 13,
          name: "收音機",
          description: "用於接收緊急廣播",
          category: "tools",
          priority: "medium",
        },
        {
          id: 14,
          name: "電池",
          description: "用於手電筒、收音機等設備",
          category: "tools",
          priority: "high",
        },
        {
          id: 15,
          name: "耐磨手套",
          description: "用於保護雙手",
          category: "tools",
          priority: "low",
        },
        {
          id: 16,
          name: "瑞士刀",
          description: "多功能工具，適用於各種情況",
          category: "tools",
          priority: "medium",
        },
      ];
      
      // 英文物品清單
      const suppliesEn = [
        // 食物
        {
          id: 1,
          name: "Drinking Water",
          description: "At least 3 liters per person per day, recommend storing 3-day supply",
          category: "food",
          priority: "high",
        },
        {
          id: 2,
          name: "Emergency Food",
          description: "High-calorie, easy-to-store food items, check expiration dates",
          category: "food",
          priority: "high",
        },
        {
          id: 3,
          name: "Dry Food",
          description: "Lightweight and long-lasting dry food",
          category: "food",
          priority: "medium",
        },

        // 保暖衣物
        {
          id: 4,
          name: "Hand Warmers",
          description: "For warmth in cold environments",
          category: "clothing",
          priority: "high",
        },
        {
          id: 5,
          name: "Clothes",
          description: "Extra set of clean clothing",
          category: "clothing",
          priority: "medium",
        },
        {
          id: 6,
          name: "Small Blanket",
          description: "Lightweight and warm emergency blanket",
          category: "clothing",
          priority: "medium",
        },

        // 個人醫藥用品
        {
          id: 7,
          name: "First Aid Kit",
          description: "Includes bandages, gauze, antiseptics and basic medical supplies",
          category: "medical",
          priority: "high",
        },
        {
          id: 8,
          name: "Medications",
          description: "Personal medications such as cold medicine, pain relievers, etc.",
          category: "medical",
          priority: "high",
        },

        // 重要物品
        {
          id: 9,
          name: "Small Amount of Cash",
          description: "For transactions during emergencies",
          category: "important",
          priority: "high",
        },
        {
          id: 10,
          name: "Copies of Documents",
          description: "Copies of ID card, passport and other important documents",
          category: "important",
          priority: "high",
        },

        // 其他工具類
        {
          id: 11,
          name: "Flashlight",
          description: "Recommend LED flashlights for low power consumption and high brightness",
          category: "tools",
          priority: "high",
        },
        {
          id: 12,
          name: "Whistle",
          description: "For emergency signaling",
          category: "tools",
          priority: "medium",
        },
        {
          id: 13,
          name: "Radio",
          description: "For receiving emergency broadcasts",
          category: "tools",
          priority: "medium",
        },
        {
          id: 14,
          name: "Batteries",
          description: "For flashlights, radios and other devices",
          category: "tools",
          priority: "high",
        },
        {
          id: 15,
          name: "Work Gloves",
          description: "For hand protection",
          category: "tools",
          priority: "low",
        },
        {
          id: 16,
          name: "Swiss Army Knife",
          description: "Multi-function tool useful in various situations",
          category: "tools",
          priority: "medium",
        },
      ];

      const priorityLabels = {
        high: "最高優先",
        medium: "中度優先",
        low: "建議準備",
      };
      
      const priorityLabelsEn = {
        high: "Highest Priority",
        medium: "Medium Priority",
        low: "Recommended",
      };

      const suppliesByCategory = computed(() => {
        return supplies.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
      });
      
      const suppliesByCategoryEn = computed(() => {
        return suppliesEn.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
      });

      const saveChecklist = () => {
        const savedItems = Object.keys(checkedItems.value)
          .filter((id) => checkedItems.value[id])
          .map((id) => {
            const itemId = parseInt(id);
            return currentLanguage.value === 'zh' 
              ? supplies.find((item) => item.id === itemId)
              : suppliesEn.find((item) => item.id === itemId);
          });
          
        console.log("已儲存的清單:", savedItems);
        if (currentLanguage.value === 'zh') {
          alert("清單已儲存！");
        } else {
          alert("List has been saved!");
        }
      };

      // 處理照片上傳
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedImage.value = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

      // 計算建議
      const calculateSuggestions = async () => {
        // 檢查必填欄位
        if (
          !userInfo.value.age ||
          !userInfo.value.height ||
          !userInfo.value.weight
        ) {
          if (currentLanguage.value === 'zh') {
            alert("請填寫完整的個人資訊");
          } else {
            alert("Please fill in all personal information");
          }
          return;
        }

        try {
          // 根據環境選擇正確的 API URL
          const isAmplify = window.location.hostname.includes("amplifyapp.com");
          const baseUrl = isAmplify
            ? "https://gidhnf5qp4.execute-api.us-west-2.amazonaws.com/dev"
            : "api";
          const apiUrl = `${baseUrl}/compute`;

          // 轉換性別格式以與 API 匹配
          const gender = userInfo.value.gender === "male" ? "男" : "女";

          console.log("發送請求到:", apiUrl);
          console.log("發送數據:", {
            gender: gender,
            weight: parseFloat(userInfo.value.weight),
            height: parseFloat(userInfo.value.height),
            age: parseFloat(userInfo.value.age),
            activityLevel: 1.2,
          });

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gender: gender,
              weight: parseFloat(userInfo.value.weight),
              height: parseFloat(userInfo.value.height),
              age: parseFloat(userInfo.value.age),
              activityLevel: 1.3,
            }),
          });

          console.log("API 響應狀態:", response.status);

          if (!response.ok) {
            throw new Error(`服務器錯誤 (${response.status})`);
          }

          // 檢查響應的內容類型和大小
          const contentType = response.headers.get("content-type");
          console.log("響應內容類型:", contentType);

          // 使用 text() 方法獲取原始響應文本
          const responseText = await response.text();
          console.log("原始響應:", responseText);

          // 如果響應為空或無效
          if (!responseText || responseText.trim() === "") {
            console.log("響應為空，使用本地計算");
            fallbackCalculation();
            return;
          }

          // 嘗試將文本解析為 JSON
          let data;
          try {
            data = JSON.parse(responseText);
            console.log("解析後的數據:", data);

            // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
            if (data.body && typeof data.body === "string") {
              try {
                // 解析嵌套的 JSON 字符串
                data = JSON.parse(data.body);
                console.log("從 body 中解析的數據:", data);
              } catch (nestedJsonError) {
                console.error("解析嵌套 JSON 錯誤:", nestedJsonError);
                fallbackCalculation();
                return;
              }
            }
          } catch (jsonError) {
            console.error("JSON 解析錯誤:", jsonError);
            fallbackCalculation();
            return;
          }

          // 確保數據包含必要的字段
          if (!data.bmr || !data.tdee) {
            console.error("數據缺少必要字段");
            fallbackCalculation();
            return;
          }

          // 從 API 結果中提取數據並計算食物分配
          const bmr = data.bmr;
          const tdee = data.tdee;
          const dailyCalories = tdee;
          const caloriesPerMeal = Math.round(dailyCalories / 3);

          // 根據熱量計算食物分配
          const carbs = Math.round((dailyCalories * 0.5) / 4); // 碳水化合物：50%，1克=4卡路里
          const protein = Math.round((dailyCalories * 0.3) / 4); // 蛋白質：30%，1克=4卡路里
          const fat = Math.round((dailyCalories * 0.2) / 9); // 脂肪：20%，1克=9卡路里

          const foodDistribution = [
            {
              name: "主食（米飯/麵條）",
              amount: Math.round(carbs * 0.7) + "g",
            },
            { name: "蔬菜水果", amount: "至少 400g" },
            { name: "肉類/豆類", amount: protein + "g" },
            { name: "油脂", amount: fat + "g" },
          ];

          // 設置建議結果
          suggestions.value = {
            caloriesPerMeal,
            foodDistribution,
            bmr,
            tdee,
          };

          console.log("設置結果:", suggestions.value);
        } catch (error) {
          console.error("API 調用失敗:", error);
          // 如果 API 調用失敗，使用本地計算作為備用
          fallbackCalculation();
        }
      };

      // 添加備用計算方法
      const fallbackCalculation = () => {
        // 根據體重計算基礎代謝率 (BMR)
        const weight = userInfo.value.weight;
        const height = userInfo.value.height;
        const age = userInfo.value.age;
        const gender = userInfo.value.gender;

        // 使用 Mifflin-St Jeor 公式計算 BMR
        let bmr = 0;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // 災難情境下，活動水平降低
        const dailyCalories = Math.round(bmr * 1.3);
        const caloriesPerMeal = Math.round(dailyCalories / 3);

        // 根據熱量計算食物分配
        const carbs = Math.round((dailyCalories * 0.5) / 4);
        const protein = Math.round((dailyCalories * 0.3) / 4);
        const fat = Math.round((dailyCalories * 0.2) / 9);

        const foodDistribution = [
          { name: "主食（米飯/麵條）", amount: Math.round(carbs * 0.7) + "g" },
          { name: "蔬菜水果", amount: "至少 400g" },
          { name: "肉類/豆類", amount: protein + "g" },
          { name: "油脂", amount: fat + "g" },
        ];

        suggestions.value = {
          caloriesPerMeal,
          foodDistribution,
          bmr: Math.round(bmr),
          tdee: dailyCalories,
        };

        // 顯示本地計算訊息
        if (currentLanguage.value === 'zh') {
          alert("使用本地計算功能 (API 不可用)");
        } else {
          alert("Using local calculation function (API unavailable)");
        }
      };

      const analyzeNutrition = async () => {
        // 檢查是否填寫了基本資訊
        if (
          !userInfo.value.age ||
          !userInfo.value.height ||
          !userInfo.value.weight
        ) {
          if (currentLanguage.value === 'zh') {
            alert("請先填寫完整的個人資訊");
          } else {
            alert("Please fill in all personal information first");
          }
          return;
        }

        // 設置加載狀態
        nutritionAnalysis.value = {
          loading: true,
          text: "",
        };

        try {
          // 根據環境選擇正確的 API URL
          const isAmplify = window.location.hostname.includes("amplifyapp.com");
          const baseUrl = isAmplify
            ? "https://8v4h7gjyik.execute-api.us-west-2.amazonaws.com/dev"
            : "supply";
          const apiUrl = `${baseUrl}/get`;

          console.log("發送營養分析請求到:", apiUrl);

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              calories: parseInt(suggestions.value.caloriesPerMeal),
              language: currentLanguage.value === 'zh' ? 'zh' : 'en'
            }),
          });

          console.log("營養分析API狀態:", response.status);

          if (!response.ok) {
            throw new Error(`服務器錯誤 (${response.status})`);
          }

          // 處理 API 響應
          const responseText = await response.text();
          console.log("營養分析原始響應:", responseText);

          let data;
          try {
            data = JSON.parse(responseText);
            console.log("解析後的營養分析數據:", data);

            // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
            if (data.body && typeof data.body === "string") {
              try {
                data = JSON.parse(data.body);
                console.log("從 body 中解析的營養分析數據:", data);
              } catch (nestedError) {
                // 如果 body 不是有效的 JSON，則直接使用它作為文本
                nutritionAnalysis.value = {
                  loading: false,
                  text: data.body,
                };
                return;
              }
            }

            // 設置營養分析結果
            nutritionAnalysis.value = {
              loading: false,
              text: data.recommendation || data.text || (currentLanguage.value === 'zh' ? "沒有可用的營養建議" : "No nutrition recommendations available"),
            };
          } catch (jsonError) {
            console.error("JSON 解析錯誤:", jsonError);

            // 如果無法解析為 JSON，則直接顯示文本
            nutritionAnalysis.value = {
              loading: false,
              text: responseText || (currentLanguage.value === 'zh' ? "無法解析回應" : "Unable to parse response"),
            };
          }
        } catch (error) {
          console.error("營養分析 API 調用失敗:", error);
          nutritionAnalysis.value = {
            loading: false,
            text: currentLanguage.value === 'zh' 
              ? "無法獲取營養建議，請稍後再試。" + error.message
              : "Unable to get nutrition recommendations, please try again later. " + error.message,
          };
        }
      };

      // 添加格式化營養文本的計算屬性
      const formattedNutritionText = computed(() => {
        if (!nutritionAnalysis.value || !nutritionAnalysis.value.text) {
          return "";
        }

        // 將文本中的換行轉換為 HTML 換行標籤
        return nutritionAnalysis.value.text
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>")
          .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>")
          .replace(/<\/ul><ul>/g, "");
      });
      
      // 英文版格式化營養文本
      const formattedNutritionTextEn = computed(() => {
        if (!nutritionAnalysis.value || !nutritionAnalysis.value.text) {
          return "";
        }

        // 將文本中的換行轉換為 HTML 換行標籤
        return nutritionAnalysis.value.text
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>")
          .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>")
          .replace(/<\/ul><ul>/g, "");
      });

      return {
        activeCategory,
        suppliesByCategory,
        suppliesByCategoryEn,
        priorityLabels,
        priorityLabelsEn,
        checkedItems,
        saveChecklist,
        uploadedImage,
        userInfo,
        suggestions,
        handleFileUpload,
        calculateSuggestions,
        analyzeNutrition,
        nutritionAnalysis,
        formattedNutritionText,
        formattedNutritionTextEn,
        currentLanguage,
      };
    },
  };
</script>

<style scoped>
  .supply-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .supply-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .subtitle {
    color: #777;
    font-size: 1rem;
    margin-top: 5px;
  }

  .category-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tab-button {
    padding: 10px 20px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .tab-button.active {
    background-color: #f4d9b0;
    color: #2c3e50;
  }

  .food-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .food-items,
  .food-analysis {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .food-items h2,
  .food-analysis h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  .food-analysis p {
    text-align: center;
    margin-bottom: 20px;
    color: #555;
  }

  .supply-categories {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .category {
    margin-bottom: 30px;
  }

  .category h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #2c3e50;
  }

  .list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    width: 100%;
  }

  .item-content {
    flex-grow: 1;
  }

  .item-description {
    font-size: 0.9rem;
    color: #555;
    margin: 5px 0;
  }

  .priority-tag {
    font-size: 0.8rem;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: #ffecec;
    color: #e74c3c;
  }

  .priority-medium {
    background-color: #fef9e7;
    color: #f39c12;
  }

  .priority-low {
    background-color: #eafaf1;
    color: #2ecc71;
  }

  .save-button {
    padding: 12px 20px;
    background-color: #f4d9b0;
    color: #2c3e50;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 20px auto; /* 置中 */
    display: block; /* 讓按鈕置中 */
  }

  .save-button:hover {
    background-color: #eac89a;
  }

  .upload-section,
  .user-info-section,
  .suggestions-section {
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .upload-section h3,
  .user-info-section h3,
  .suggestions-section h3 {
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  .hint-text {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 10px;
    text-align: center;
  }

  .file-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    display: block;
    margin: 0 auto;
  }

  .uploaded-image {
    text-align: center;
    margin-top: 15px;
  }

  .uploaded-image img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
  }

  /* 修改表單樣式 - 使輸入框置中 */
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平置中 */
    margin-bottom: 15px;
    text-align: center; /* 文字置中 */
  }

  .form-group label {
    width: 100%;
    margin-bottom: 8px;
    text-align: center; /* 標籤文字置中 */
    font-weight: 500;
  }

  .form-group input,
  .form-group select {
    width: 80%; /* 控制輸入框的寬度 */
    max-width: 300px; /* 限制最大寬度 */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: center; /* 輸入文字置中 */
  }

  /* 修改計算建議按鈕 - 縮小並置中 */
  .calculate-button {
    padding: 10px 20px;
    background-color: #56a59b; /* 統一按鈕顏色 */
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 20px auto 5px; /* 上下間距調整，並水平置中 */
    width: 60%; /* 縮小按鈕寬度 */
    max-width: 200px; /* 限制最大寬度 */
    transition: background-color 0.3s ease;
    display: block; /* 確保按鈕可以置中 */
  }

  .calculate-button:hover {
    background-color: #419287; /* hover 效果 */
  }

  .suggestion-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .calories {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  .calories span {
    font-weight: bold;
    color: #e74c3c;
  }

  .food-distribution {
    list-style-type: none;
    padding-left: 0;
  }

  .food-distribution li {
    padding: 8px 0;
    border-bottom: 1px dashed #eee;
    text-align: center;
  }

  .food-name {
    font-weight: bold;
    color: #2c3e50;
  }

  .food-amount {
    color: #3498db;
  }

  .analysis-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }

  .calculate-button,
  .analyze-button {
    padding: 10px 20px;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 45%;
    max-width: 200px;
    transition: background-color 0.3s ease;
  }

  .calculate-button {
    background-color: #56a59b;
  }

  .analyze-button {
    background-color: #5c6bc0;
  }

  .calculate-button:hover {
    background-color: #419287;
  }

  .analyze-button:hover {
    background-color: #3f51b5;
  }

  .nutrition-analysis-section {
    margin-top: 30px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .nutrition-analysis-section h3 {
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  .analysis-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #5c6bc0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .instruction-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
    text-align: center;
  }

  .nutrition-text {
    line-height: 1.6;
    color: #333;
    text-align: left;
  }

  .nutrition-text ul {
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .nutrition-text li {
    margin-bottom: 5px;
  }

  .nutrition-text strong {
    color: #5c6bc0;
  }

  /* 添加響應式設計 */
  @media (max-width: 768px) {
    .supply-list {
      max-width: 95%;
      padding: 15px;
    }

    .food-items,
    .food-analysis {
      padding: 15px;
    }

    .category h2,
    .food-items h2,
    .food-analysis h2 {
      font-size: 1.3rem;
    }

    .item-content h3 {
      font-size: 1rem;
    }

    .calculate-button {
      width: 70%; /* 平板上稍微寬一點 */
    }
  }

  @media (max-width: 480px) {
    .supply-list {
      padding: 10px;
    }

    .supply-header h1 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 0.9rem;
    }

    .category-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .tab-button {
      width: 100%;
      padding: 8px 15px;
    }

    .form-group input,
    .form-group select {
      width: 90%; /* 手機上稍微寬一點 */
    }

    .calculate-button {
      width: 80%; /* 手機上更寬 */
      font-size: 0.9rem;
    }

    .list-item {
      padding: 12px;
    }

    .checkbox-label {
      flex-direction: row;
      align-items: flex-start;
    }

    .checkbox-label input[type="checkbox"] {
      margin-top: 5px;
    }

    .save-button {
      padding: 10px 15px;
      font-size: 0.9rem;
      width: 80%;
      max-width: 200px;
    }

    .uploaded-image img {
      max-height: 150px;
    }

    .analysis-actions {
      flex-direction: column;
      align-items: center;
    }

    .calculate-button,
    .analyze-button {
      width: 80%;
      max-width: none;
      margin-bottom: 10px;
    }
  }

  /* 觸控設備優化 */
  @media (hover: none) {
    .calculate-button:active,
    .save-button:active,
    .tab-button:active {
      transform: scale(0.98);
      background-color: #56a59b;
    }
  }

  /* 添加新樣式 */
  .metabolism-info {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #e0e0e0;
  }

  .info-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .info-label {
    font-weight: 600;
    color: #2c3e50;
  }

  .info-value {
    color: #4caf50;
    font-weight: 600;
  }
</style>

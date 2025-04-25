<template>
    <div class="emergency-page">
      <SurvivalPlan />
      <div class="resource-management">
        <h2>資源管理系統</h2>
        <div class="inventory-input">
          <h3>現有物資登記</h3>
          <form @submit.prevent="calculateSurvivalPlan">
            <div class="form-section">
              <h4>食物</h4>
              <div class="form-group">
                <label>米/麵食 (公斤)</label>
                <input v-model="inventory.staples" type="number" min="0" step="0.1">
              </div>
              <div class="form-group">
                <label>罐頭/保存食品 (個)</label>
                <input v-model="inventory.canned" type="number" min="0">
              </div>
              <div class="form-group">
                <label>零食/能量棒 (個)</label>
                <input v-model="inventory.snacks" type="number" min="0">
              </div>
            </div>
  
            <div class="form-section">
              <h4>飲水</h4>
              <div class="form-group">
                <label>飲用水 (公升)</label>
                <input v-model="inventory.water" type="number" min="0" step="0.1">
              </div>
            </div>
  
            <div class="form-section">
              <h4>成員資訊</h4>
              <div class="form-group">
                <label>成員人數</label>
                <input v-model="peopleCount" type="number" min="1">
              </div>
              <div class="form-group">
                <label>特殊需求</label>
                <textarea v-model="specialNeeds" placeholder="例如：嬰兒、老人、藥物需求等"></textarea>
              </div>
            </div>
  
            <button type="submit" class="calculate-btn">計算生存計畫</button>
          </form>
        </div>
        <div class="survival-schedule" v-if="survivalPlan">
          <h3>生存資源配給計畫</h3>
          <div class="plan-summary">
            <div class="summary-item">
              <strong>預估可存活天數：</strong> {{ survivalPlan.days }} 天
            </div>
            <div class="summary-item">
              <strong>每日水分配：</strong> {{ survivalPlan.waterPerDay }} 公升/人
            </div>
            <div class="summary-item">
              <strong>每日熱量：</strong> {{ survivalPlan.caloriesPerDay }} 大卡/人
            </div>
          </div>
  
          <h4>每日配給計畫</h4>
          <div class="daily-schedule">
            <div v-for="(day, index) in survivalPlan.schedule" :key="index" class="day-plan">
              <h5>第 {{ index + 1 }} 天</h5>
              <ul>
                <li v-for="(meal, mealIndex) in day.meals" :key="mealIndex">
                  {{ meal.time }}: {{ meal.description }}
                </li>
              </ul>
            </div>
          </div>
  
          <div class="survival-tips">
            <h4>生存建議</h4>
            <ul>
              <li v-for="(tip, index) in survivalPlan.tips" :key="index">{{ tip }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SurvivalPlan from '@/components/SurvivalPlan.vue'
  import { ref } from 'vue'
  
  export default {
    name: 'EmergencyPage',
    components: {
      SurvivalPlan
    },
    setup() {
      const survivalPlan = ref(null)
      const inventory = ref({
        staples: 0,
        canned: 0,
        snacks: 0,
        water: 0
      })
      const peopleCount = ref(1)
      const specialNeeds = ref('')
  
      const calculateSurvivalPlan = async () => {
        try {
          // 這裡將使用 SageMaker 模型計算最佳資源分配方案
          // 模擬API調用
          const response = await fetch('https://api.yourendpoint.com/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              inventory: inventory.value,
              peopleCount: peopleCount.value,
              specialNeeds: specialNeeds.value
            })
          })

          console.log('API Response:', response);
  
          // 測試用範例資料
          survivalPlan.value = {
            days: Math.floor(Math.min(inventory.value.water / (peopleCount.value * 2), 
                                     (inventory.value.staples * 2000 + inventory.value.canned * 500 + inventory.value.snacks * 250) / 
                                     (peopleCount.value * 1500))),
            waterPerDay: (inventory.value.water / peopleCount.value / 
                          Math.min(inventory.value.water / (peopleCount.value * 2), 
                                 (inventory.value.staples * 2000 + inventory.value.canned * 500 + inventory.value.snacks * 250) / 
                                 (peopleCount.value * 1500))).toFixed(1),
            caloriesPerDay: 1500,
            schedule: Array.from({ length: 3 }, () => ({
              meals: [
                { time: '早餐', description: '半碗米飯 + 四分之一罐頭' },
                { time: '午餐', description: '一小包餅乾 + 少量水' },
                { time: '晚餐', description: '半碗米飯 + 四分之一罐頭' }
              ]
            })),
            tips: [
              '盡量減少體力活動以節省能量',
              '在最熱的時間避免外出以減少水分流失',
              '收集雨水可以補充飲用水',
              '定期檢查食物是否變質'
            ]
          }
        } catch (error) {
          console.error('計算生存計畫時發生錯誤:', error)
        }
      }
  
      return {
        survivalPlan,
        inventory,
        peopleCount,
        specialNeeds,
        calculateSurvivalPlan
      }
    }
  }
  </script>
  
  <style scoped>
  .emergency-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .resource-management {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  }
  
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  input, textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .calculate-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .calculate-btn:hover {
    background-color: #c0392b;
  }
  
  .survival-schedule {
    margin-top: 30px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .plan-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .summary-item {
    flex-grow: 1;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    min-width: 200px;
  }
  
  .daily-schedule {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .day-plan {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .survival-tips {
    background-color: #fdedec;
    padding: 15px;
    border-radius: 5px;
  }
  </style>
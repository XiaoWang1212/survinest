<!-- filepath: c:\Users\USER\Desktop\survinest\src\views\TestPage.vue -->
<template>
    <div class="nutrition-calculator">
      <div class="calculator-container">
        <h1 class="page-title">身體代謝計算器</h1>
        <p class="intro-text">計算您的基礎代謝率(BMR)和每日總熱量消耗(TDEE)，幫助您規劃健康飲食計畫</p>
        
        <div class="calculator-form">
          <div class="form-group">
            <label>性別</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="formData.gender" value="男" checked>
                <span>男性</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="formData.gender" value="女">
                <span>女性</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>體重 (公斤)</label>
            <input 
              type="number" 
              v-model.number="formData.weight" 
              min="30" 
              max="300"
              step="0.1" 
              placeholder="例: 70"
            >
          </div>
          
          <div class="form-group">
            <label>身高 (公分)</label>
            <input 
              type="number" 
              v-model.number="formData.height" 
              min="100" 
              max="250"
              step="1" 
              placeholder="例: 175"
            >
          </div>
          
          <div class="form-group">
            <label>年齡</label>
            <input 
              type="number" 
              v-model.number="formData.age" 
              min="15" 
              max="100"
              step="1" 
              placeholder="例: 30"
            >
          </div>
          
          <div class="form-group">
            <label>活動程度</label>
            <select v-model.number="formData.activityLevel">
              <option :value="1.2">久坐不動 (幾乎不運動)</option>
              <option :value="1.375">輕度活動 (每週運動1-3次)</option>
              <option :value="1.55" selected>中度活動 (每週運動3-5次)</option>
              <option :value="1.725">高度活動 (每週運動6-7次)</option>
              <option :value="1.9">極高度活動 (每天重訓或體力勞動工作)</option>
            </select>
          </div>
          
          <button class="calculate-btn" @click="calculateBmrTdee" :disabled="loading || !isFormValid">
            <span v-if="loading" class="loading-spinner"></span>
            <span>{{ loading ? '計算中...' : '計算我的代謝率' }}</span>
          </button>
        </div>
        
        <div v-if="error" class="error-message">
          <span class="error-icon">!</span>
          <p>{{ error }}</p>
        </div>
        
        <div v-if="result" class="result-container">
          <h2>您的計算結果</h2>
          
          <div class="result-cards">
            <div class="result-card">
              <h3>基礎代謝率 (BMR)</h3>
              <div class="result-value">{{ result.bmr }}</div>
              <div class="result-unit">大卡/天</div>
              <p class="result-desc">您的身體在休息狀態下維持生命所需的最低熱量</p>
            </div>
            
            <div class="result-card highlight">
              <h3>總熱量消耗 (TDEE)</h3>
              <div class="result-value">{{ result.tdee }}</div>
              <div class="result-unit">大卡/天</div>
              <p class="result-desc">考慮您的活動水平後，每日實際消耗的總熱量</p>
            </div>
          </div>
          
          <div class="nutrition-goals">
            <h3>您的營養目標</h3>
            
            <div class="goals-table">
              <div class="goal-row header">
                <div class="goal-cell">目標</div>
                <div class="goal-cell">每日卡路里</div>
                <div class="goal-cell">蛋白質</div>
                <div class="goal-cell">碳水化合物</div>
                <div class="goal-cell">脂肪</div>
              </div>
              
              <div class="goal-row">
                <div class="goal-cell">減重</div>
                <div class="goal-cell">{{ Math.round(result.tdee * 0.8) }} 大卡</div>
                <div class="goal-cell">{{ Math.round(formData.weight * 2) }}g</div>
                <div class="goal-cell">{{ Math.round(Math.round(result.tdee * 0.8) * 0.4 / 4) }}g</div>
                <div class="goal-cell">{{ Math.round(Math.round(result.tdee * 0.8) * 0.3 / 9) }}g</div>
              </div>
              
              <div class="goal-row">
                <div class="goal-cell">維持</div>
                <div class="goal-cell">{{ result.tdee }} 大卡</div>
                <div class="goal-cell">{{ Math.round(formData.weight * 1.8) }}g</div>
                <div class="goal-cell">{{ Math.round(result.tdee * 0.45 / 4) }}g</div>
                <div class="goal-cell">{{ Math.round(result.tdee * 0.3 / 9) }}g</div>
              </div>
              
              <div class="goal-row">
                <div class="goal-cell">增肌</div>
                <div class="goal-cell">{{ Math.round(result.tdee * 1.1) }} 大卡</div>
                <div class="goal-cell">{{ Math.round(formData.weight * 2.2) }}g</div>
                <div class="goal-cell">{{ Math.round(Math.round(result.tdee * 1.1) * 0.45 / 4) }}g</div>
                <div class="goal-cell">{{ Math.round(Math.round(result.tdee * 1.1) * 0.25 / 9) }}g</div>
              </div>
            </div>
          </div>
          
          <div class="nutrition-tips">
            <h3>健康飲食建議</h3>
            <div class="tips-container">
              <div class="tip-item">
                <div class="tip-icon">💧</div>
                <div class="tip-content">
                  <h4>充足水分</h4>
                  <p>每天飲用約 {{ Math.round(formData.weight * 0.033 * 10) / 10 }} 公升的水，有助於新陳代謝和消化</p>
                </div>
              </div>
              
              <div class="tip-item">
                <div class="tip-icon">🍽️</div>
                <div class="tip-content">
                  <h4>均衡飲食</h4>
                  <p>每餐包含蛋白質、複合碳水化合物、健康脂肪和蔬果</p>
                </div>
              </div>
              
              <div class="tip-item">
                <div class="tip-icon">⏰</div>
                <div class="tip-content">
                  <h4>定時進食</h4>
                  <p>每3-4小時進食一次，有助於穩定血糖和提升新陳代謝</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          gender: '男',
          weight: 70,
          height: 175,
          age: 30,
          activityLevel: 1.55
        },
        result: null,
        loading: false,
        error: null
      }
    },
    
    computed: {
      isFormValid() {
        const { weight, height, age } = this.formData;
        return weight && height && age && 
          weight >= 30 && weight <= 300 && 
          height >= 100 && height <= 250 && 
          age >= 15 && age <= 100;
      }
    },
    
    methods: {
      async calculateBmrTdee() {
        if (!this.isFormValid) {
          this.error = '請確保所有欄位填寫正確的數值範圍';
          return;
        }
        
        this.loading = true;
        this.error = null;
        
        try {
          const response = await fetch('api/compute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              gender: this.formData.gender,
              weight: this.formData.weight,
              height: this.formData.height,
              age: this.formData.age,
              activityLevel: this.formData.activityLevel
            })
          });
          
          if (!response.ok) {
            throw new Error(`服務器錯誤 (${response.status})`);
          }
          
          const data = await response.json();
          console.log('計算結果:', data);
          this.result = data;
          
          // 平滑滾動到結果區域
          setTimeout(() => {
            const resultElement = document.querySelector('.result-container');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
          
        } catch (error) {
          console.error('API 調用失敗:', error);
          this.error = `無法計算結果: ${error.message || '未知錯誤'}`;
          this.result = null;
        } finally {
          this.loading = false;
        }
      },
      
      resetForm() {
        this.formData = {
          gender: '男',
          weight: 70,
          height: 175,
          age: 30,
          activityLevel: 1.55
        };
        this.result = null;
        this.error = null;
      }
    }
  }
  </script>
  
  <style scoped>
  .nutrition-calculator {
    font-family: 'Microsoft JhengHei', 'PingFang TC', 'Segoe UI', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px 20px;
    color: #333;
  }
  
  .calculator-container {
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    padding: 30px;
  }
  
  .page-title {
    color: #2c3e50;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .intro-text {
    color: #6c757d;
    text-align: center;
    margin-bottom: 30px;
    font-size: 16px;
  }
  
  .calculator-form {
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #495057;
  }
  
  .radio-group {
    display: flex;
    gap: 20px;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .radio-label input {
    margin-right: 8px;
  }
  
  input[type="number"],
  select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    color: #495057;
    transition: border-color 0.2s;
  }
  
  input[type="number"]:focus,
  select:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  .calculate-btn {
    width: 100%;
    padding: 14px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }
  
  .calculate-btn:hover {
    background-color: #43a047;
  }
  
  .calculate-btn:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
  
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .error-icon {
    background-color: #dc3545;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .result-container {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .result-container h2 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 25px;
    font-size: 24px;
  }
  
  .result-cards {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .result-card {
    flex: 1;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .result-card:hover {
    transform: translateY(-5px);
  }
  
  .result-card.highlight {
    background-color: #e8f5e9;
    border-left: 4px solid #4CAF50;
  }
  
  .result-card h3 {
    color: #6c757d;
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .result-value {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
  }
  
  .result-unit {
    color: #6c757d;
    margin-bottom: 10px;
  }
  
  .result-desc {
    font-size: 14px;
    color: #6c757d;
  }
  
  .nutrition-goals {
    margin-top: 40px;
  }
  
  .nutrition-goals h3,
  .nutrition-tips h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 20px;
    position: relative;
    padding-left: 15px;
  }
  
  .nutrition-goals h3::before,
  .nutrition-tips h3::before {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    bottom: 5px;
    width: 4px;
    background-color: #4CAF50;
    border-radius: 2px;
  }
  
  .goals-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .goal-row {
    display: flex;
    border-bottom: 1px solid #e9ecef;
  }
  
  .goal-row.header {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #495057;
  }
  
  .goal-row:last-child {
    border-bottom: none;
  }
  
  .goal-cell {
    flex: 1;
    padding: 12px 15px;
    font-size: 15px;
    text-align: center;
  }
  
  .goal-row:not(.header):hover {
    background-color: #f8f9fa;
  }
  
  .nutrition-tips {
    margin-top: 40px;
  }
  
  .tips-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .tip-item {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
  }
  
  .tip-icon {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .tip-content h4 {
    color: #2c3e50;
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  .tip-content p {
    color: #6c757d;
    font-size: 14px;
  }
  
  /* 響應式設計 */
  @media (max-width: 768px) {
    .result-cards {
      flex-direction: column;
    }
    
    .goal-row {
      flex-direction: column;
    }
    
    .goal-cell {
      padding: 10px;
    }
    
    .goal-row.header {
      display: none;
    }
    
    .goal-cell:before {
      content: attr(data-label);
      font-weight: 600;
      display: inline-block;
      width: 100px;
    }
  }
  </style>
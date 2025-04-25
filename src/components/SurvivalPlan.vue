<template>
    <div class="survival-plan">
      <div class="survival-header">
        <h1>緊急資源管理與生存計畫</h1>
        <p class="subtitle">資源有限時的智能配給系統，增加您在災難中的生存機會</p>
      </div>
      <div class="survival-features">
        <div class="feature">
          <div class="icon">📊</div>
          <h3>智能資源分析</h3>
          <p>計算現有物資可支持的生存時間，優化每日配給</p>
        </div>
        <div class="feature">
          <div class="icon">🥫</div>
          <h3>配給管理</h3>
          <p>根據人數與特殊需求，自動產生最佳飲食配給計畫</p>
        </div>
        <div class="feature">
          <div class="icon">💡</div>
          <h3>生存建議</h3>
          <p>即時提供節約資源與延長生存時間的關鍵建議</p>
        </div>
      </div>
      <div class="disaster-alert">
        <h4>防災小知識</h4>
        <p>物資不足時，人體每天至少需要500ml水與1200大卡熱量來維持基本機能。請記住盡量減少體力消耗，以節省資源。</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SurvivalPlan'
  }
  </script>
  
  <style scoped>
  .survival-plan {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .survival-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .subtitle {
    color: #777;
    font-size: 1.1rem;
    margin-top: 10px;
  }
  
  .survival-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .feature {
    text-align: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.3s;
  }
  
  .feature:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    font-size: 32px;
    margin-bottom: 15px;
  }
  
  .disaster-alert {
    background-color: #fdedec;
    padding: 15px;
    border-left: 4px solid #e74c3c;
    margin-top: 20px;
    border-radius: 4px;
  }
  </style>
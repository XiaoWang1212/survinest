<template>
    <div class="hero-section">
      <div class="hero-content">
        <h1>SurviNest<br><span class="subtitle">智慧防災顧問</span></h1>
        <p class="hero-description">
          運用人工智慧技術，為台灣家庭打造個人化防災解決方案。從空間安全分析到物資管理，全方位守護您的家人。
        </p>
        <div class="hero-cta">
          <button class="primary-cta" @click="navigateToScan">開始空間掃描</button>
          <button class="secondary-cta" @click="navigateToSupplies">防災物資建議</button>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">92%</div>
            <div class="stat-desc">使用者提升防災意識</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3x</div>
            <div class="stat-desc">提高緊急應變速度</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10k+</div>
            <div class="stat-desc">已協助台灣家庭</div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <!-- 這裡可以放置防災相關的圖片 -->
        <div class="hero-placeholder">
          <div class="placeholder-icon">🏠</div>
          <div class="placeholder-text">智慧家庭安全防護</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'HomeHero',
    setup() {
      const router = useRouter()
      
      const navigateToScan = () => {
        router.push('/scan')
      }
      
      const navigateToSupplies = () => {
        router.push('/supplies')
      }
      
      return {
        navigateToScan,
        navigateToSupplies
      }
    }
  }
  </script>
  
  <style scoped>
  .hero-section {
    display: flex;
    align-items: center;
    min-height: 80vh;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    margin-bottom: 40px;
  }
  
  .hero-content {
    flex: 1;
    padding: 0 20px;
  }
  
  h1 {
    font-size: 3.5rem;
    line-height: 1.1;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .subtitle {
    font-size: 2.5rem;
    color: #e74c3c;
  }
  
  .hero-description {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #34495e;
    margin-bottom: 30px;
    max-width: 600px;
  }
  
  .hero-cta {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
  }
  
  .primary-cta, .secondary-cta {
    padding: 12px 25px;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .primary-cta {
    background-color: #e74c3c;
    color: white;
    border: none;
  }
  
  .primary-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  }
  
  .secondary-cta {
    background-color: white;
    color: #e74c3c;
    border: 1px solid #e74c3c;
  }
  
  .secondary-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .hero-stats {
    display: flex;
    gap: 30px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: #e74c3c;
  }
  
  .stat-desc {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-placeholder {
    width: 300px;
    height: 300px;
    background-color: #ecf0f1;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .placeholder-icon {
    font-size: 80px;
    margin-bottom: 15px;
  }
  
  .placeholder-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  @media (max-width: 900px) {
    .hero-section {
      flex-direction: column;
      text-align: center;
    }
    
    .hero-content {
      order: 2;
    }
    
    .hero-image {
      order: 1;
      margin-bottom: 30px;
    }
    
    .hero-stats {
      justify-content: center;
    }
    
    .hero-description {
      margin-left: auto;
      margin-right: auto;
    }
  }
  </style>
<template>
    <div class="about-page">
      <div class="about-header">
        <h1>關於 SurviNest</h1>
        <p class="tagline">利用 AI 技術創造更安全的台灣家庭</p>
      </div>
  
      <div class="about-section">
        <h2>我們的使命</h2>
        <p>台灣身為天災頻繁的國家，人人都對災害應對有一定的初步概念。然而，只有部分人真正了解災害發生時如何避難、防災包等防災物資的內容及存放地點。在受困時，更不了解如何妥善分配資源以延長生存時間。</p>
        <p>SurviNest 致力於運用最新的 AI 技術，包括視覺辨識、空間理解與文本生成，為台灣家庭打造個人化防災顧問系統，提升全民防災意識與災害生存能力。</p>
      </div>
  
      <div class="tech-stack">
        <h2>技術實現</h2>
        <div class="tech-cards">
          <div class="tech-card">
            <h3>AWS Amplify</h3>
            <p>提供完整的全端開發與部署平台，實現跨平台的防災服務。</p>
          </div>
          <div class="tech-card">
            <h3>Amazon Bedrock Nova</h3>
            <p>尖端視覺 AI 模型，用於環境掃描與危險源辨識。</p>
          </div>
          <div class="tech-card">
            <h3>Amazon SageMaker</h3>
            <p>建立資源優化模型，計算最佳物資分配方案。</p>
          </div>
        </div>
      </div>
  
      <div class="team-section">
        <h2>我們的團隊</h2>
        <p>SurviNest 團隊由一群對防災與 AI 技術充滿熱情的專業人士組成，包括:</p>
        <ul class="team-list">
          <li>災害管理專家</li>
          <li>AI 工程師</li>
          <li>UX/UI 設計師</li>
          <li>全端開發工程師</li>
          <li>資安專家</li>
        </ul>
      </div>
  
      <div class="contact-section">
        <h2>聯絡我們</h2>
        <p>對於 SurviNest 有任何建議或合作意向，歡迎聯絡我們：</p>
        <div class="contact-info">
          <div class="contact-item">
            <strong>Email:</strong> info@survinest.com
          </div>
          <div class="contact-item">
            <strong>電話:</strong> 02-1234-5678
          </div>
          <div class="contact-item">
            <strong>地址:</strong> 台北市信義區松智路 100 號 8 樓
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage'
  }
  </script>
  
  <style scoped>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .about-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .tagline {
    color: #777;
    font-size: 1.2rem;
  }
  
  .about-section {
    margin-bottom: 40px;
    line-height: 1.8;
  }
  
  .about-section p {
    margin-bottom: 20px;
  }
  
  .tech-stack {
    margin-bottom: 40px;
  }
  
  .tech-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .tech-card {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .team-section {
    margin-bottom: 40px;
  }
  
  .team-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    list-style: none;
    margin-top: 15px;
  }
  
  .team-list li {
    background-color: #ebf5fb;
    padding: 8px 15px;
    border-radius: 20px;
    color: #2980b9;
  }
  
  .contact-section {
    background-color: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
  }
  
  .contact-info {
    margin-top: 15px;
  }
  
  .contact-item {
    margin-bottom: 10px;
  }
  </style>
<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">SurviNest 智慧防災顧問</h3>
          <p class="footer-description">
            運用 AI 技術打造智慧防災解決方案，保障台灣家庭安全，提升全民防災意識與災害生存能力。
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <i class="social-icon">📱</i>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <i class="social-icon">📷</i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <i class="social-icon">💼</i>
            </a>
          </div>
        </div>
  
        <div class="footer-section">
          <h3 class="footer-title">快速連結</h3>
          <ul class="footer-links">
            <li><router-link to="/">首頁</router-link></li>
            <li><router-link to="/scan">安全掃描</router-link></li>
            <li><router-link to="/supplies">防災物資</router-link></li>
            <li><router-link to="/emergency">緊急資源管理</router-link></li>
            <li><router-link to="/about">關於我們</router-link></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3 class="footer-title">聯絡我們</h3>
          <address class="contact-info">
            <p>
              <i class="contact-icon">📍</i>
              台北市信義區松智路 100 號 8 樓
            </p>
            <p>
              <i class="contact-icon">📞</i>
              02-1234-5678
            </p>
            <p>
              <i class="contact-icon">✉️</i>
              <a href="mailto:info@survinest.com">info@survinest.com</a>
            </p>
          </address>
        </div>
  
        <div class="footer-section">
          <h3 class="footer-title">合作夥伴</h3>
          <ul class="partners-list">
            <li>中央災害應變中心</li>
            <li>國家防災科技中心</li>
            <li>台灣人工智慧學校</li>
            <li>AWS Taiwan</li>
          </ul>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} SurviNest 智慧防災顧問。保留所有權利。
        </p>
        <div class="footer-legal">
          <router-link to="/privacy">隱私政策</router-link>
          <span class="separator">|</span>
          <router-link to="/terms">使用條款</router-link>
        </div>
      </div>
  
      <div class="emergency-banner">
        <strong>緊急災害通報：</strong>119 火警救護 | 110 警察報案 | 1999 市民熱線
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding-top: 50px;
    margin-top: 60px;
    width: 100%;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-section {
    margin-bottom: 30px;
  }
  
  .footer-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: white;
    position: relative;
    padding-bottom: 10px;
  }
  
  .footer-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: #e74c3c;
  }
  
  .footer-description {
    color: #bdc3c7;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #34495e;
    border-radius: 50%;
    color: #ecf0f1;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .social-link:hover {
    background-color: #e74c3c;
    transform: translateY(-3px);
  }
  
  .social-icon {
    font-size: 16px;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 10px;
  }
  
  .footer-links a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s, padding-left 0.3s;
  }
  
  .footer-links a:hover {
    color: white;
    padding-left: 5px;
  }
  
  .contact-info {
    font-style: normal;
    color: #bdc3c7;
  }
  
  .contact-info p {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .contact-icon {
    margin-right: 10px;
  }
  
  .contact-info a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .contact-info a:hover {
    color: white;
  }
  
  .partners-list {
    list-style: none;
    padding: 0;
    color: #bdc3c7;
  }
  
  .partners-list li {
    margin-bottom: 10px;
  }
  
  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    border-top: 1px solid #34495e;
  }
  
  .copyright {
    color: #95a5a6;
    font-size: 0.9rem;
  }
  
  .footer-legal {
    display: flex;
    align-items: center;
  }
  
  .footer-legal a {
    color: #95a5a6;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
  }
  
  .footer-legal a:hover {
    color: white;
  }
  
  .separator {
    color: #95a5a6;
    margin: 0 10px;
  }
  
  .emergency-banner {
    background-color: #e74c3c;
    color: white;
    text-align: center;
    padding: 10px 20px;
    font-size: 0.9rem;
    margin-top: 30px;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
    }
  
    .footer-bottom {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
  }
  </style>
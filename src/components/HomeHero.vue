<template>
  <div class="hero-section" @click="handleOutsideClick" :class="{ 'english-bg': currentLanguage === 'English' }">
    <!-- 左上角語言切換 -->
    <div class="language-wrapper" @click.stop>
      <div class="language-selector" @click="toggleLanguageDropdown">
        🌐 {{ currentLanguage }}
        <div class="language-dropdown" v-if="showLanguageDropdown">
          <div class="language-option" @click="setLanguage('繁體中文')">🌐 繁體中文</div>
          <div class="language-option" @click="setLanguage('English')">🌐 English</div>
        </div>
      </div>
    </div>

    <!-- 主內容 - 只保留了解更多按鈕 -->
    <div class="content-wrapper">
      <button class="more-button" @click="showModal = true">
        {{ currentLanguage === 'English' ? 'Learn More' : '了解更多' }}
      </button>
    </div>    

    <div class="top-buttons">
      <button class="btn-primary" @click="navigateToLogin()">
        {{ currentLanguage === 'English' ? 'Sign Up / Log In' : '註冊 / 登入' }}
      </button>
      <button class="btn-secondary" @click="navigateToHome()">
        {{ currentLanguage === 'English' ? 'Quick Start' : '快速進入' }}
      </button>
    </div>

    <!-- Modal - 中文版本 -->
    <div class="modal" v-if="showModal && currentLanguage === '繁體中文'">
      <div class="modal-content">
        <div class="feature">
          <h3 class="feature-title">🗺️ 地震逃生路線及躲避位置建議</h3>
          <p>
            只要<span class="highlight">拍攝家中場景</span>，SurviNest 即可辨識危險源與可逃生出口，建構完整<span class="highlight">逃生路線</span>及安全的<span class="highlight">躲避位置</span>。
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">🎒 防災包位置及內容建議</h3>
          <p>
            根據家庭成員數及體重等推薦<span class="highlight">備品清單</span>與<span class="highlight">儲藏建議</span>。
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">🍽️ 災中輔助存活系統</h3>
          <p>
            若受困時可啟用，SurviNest <span class="highlight">根據現有糧食量與個人身體狀況自動排餐</span>，陪你等待救援！
          </p>
        </div>
        <button class="close-button" @click="showModal = false">關閉</button>
      </div>
    </div>

    <!-- Modal - 英文版本 -->
    <div class="modal" v-if="showModal && currentLanguage === 'English'">
      <div class="modal-content">
        <div class="feature">
          <h3 class="feature-title">🗺️ Earthquake Evacuation Routes & Safe Spots</h3>
          <p>
            Simply <span class="highlight">take photos of your home</span>, and SurviNest will identify hazards and exits to create complete <span class="highlight">evacuation routes</span> and <span class="highlight">safe spots</span>.
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">🎒 Emergency Kit Recommendations</h3>
          <p>
            Get personalized <span class="highlight">supply lists</span> and <span class="highlight">storage suggestions</span> based on family size and individual needs.
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">🍽️ Survival Assistance System</h3>
          <p>
            During emergencies, SurviNest <span class="highlight">automatically plans meals based on available food and personal health conditions</span> to help you wait for rescue!
          </p>
        </div>
        <button class="close-button" @click="showModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHero',
  data() {
    return {
      showModal: false,
      currentLanguage: '繁體中文',
      showLanguageDropdown: false
    }
  },
  created() {
    // 載入用戶偏好的語言
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  },
  methods: {
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
    setLanguage(language) {
      this.currentLanguage = language;
      // 保存語言偏好到 localStorage
      localStorage.setItem('preferredLanguage', language);
      this.showLanguageDropdown = false;
    },
    handleOutsideClick() {
      this.showLanguageDropdown = false;
    },
    navigateToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    navigateToHome() {
      this.$router.push({ name: 'HomePage' });
    }
  }
}
</script>

<style scoped>

.content-wrapper {
  position: relative;
  z-index: 2;
  margin-top: 100px;
}

.more-button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-weight: bold;
}

.more-button:hover {
  background-color: #1a242f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-top: 80px; /* 中等螢幕時縮小邊距 */
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    margin-top: 60px; /* 小螢幕時進一步縮小邊距 */
  }
}

.hero-section {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  padding-left: 10%;
  padding-top: 33%;
  transition: background-image 0.5s ease; /* 平滑過渡背景圖片 */
}

.hero-section.english-bg {
  background-image: url('@/assets/backgroundEn.png');
}

/* 左上角語言選單 */
.language-wrapper {
  position: absolute;
  top: 20px;
  left: 20px;
}

.language-selector {
  position: relative;
  background-color: white;
  color: #2c3e50;
  padding: 10px 16px; /* 縮小 */
  font-size: 1rem; /* 縮小 */
  border: 2px solid #2c3e50;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.language-selector:hover {
  background-color: #2c3e50;
  color: white;
  transform: translateY(-2px); 
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.language-dropdown {
  position: absolute;
  top: 45px;
  left: 0;
  background: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1001;
  min-width: 150px;
  overflow: hidden;
}

.language-option {
  padding: 12px 20px;
  cursor: pointer;
  white-space: nowrap;
  color: #2c3e50;
  transition: all 0.2s ease;
}

.language-option:hover {
  background-color: #2c3e50;
  color: white;
  transform: translateX(5px);
}

/* 右上角登入按鈕 */
.top-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.btn-primary {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px; /* 縮小 */
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem; /* 縮小 */
}

.btn-primary:hover {
  background-color: #1a242f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.btn-secondary {
  background-color: white;
  color: #2c3e50;
  padding: 10px 20px; /* 縮小 */
  border: 2px solid #2c3e50;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem; /* 縮小 */
}

.btn-secondary:hover {
  background-color: #2c3e50;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 15px;
  max-width: 600px;
  max-height: 70vh;
  overflow-y: auto;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.feature {
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.feature:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.feature-title {
  font-size: 1.3rem;
  color: #1c1c4f;
  margin-bottom: 10px;
  background-color: #e8eaf6;
  padding: 8px 15px;
  border-radius: 8px;
  display: inline-block;
}

.feature p {
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
}

.highlight {
  color: #e74c3c;
  font-weight: bold;
  padding: 0 2px;
}

.close-button {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}
/* 響應式設計 */
.sub-text {
  padding-right: 5%;
}

@media (max-width: 768px) {
  .language-wrapper {
    top: 15px;
    left: 15px;
  }

  .top-buttons {
    top: 15px;
    right: 15px;
    flex-direction: column;
    gap: 8px;
  }

  .btn-primary, .btn-secondary {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .sub-text br {
    display: none; 
  }

  .feature-title {
    font-size: 1.1rem;
  }

  .feature p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .language-selector {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .language-option {
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  .btn-primary, .btn-secondary {
    padding: 7px 12px;
    font-size: 0.85rem;
  }

  .sub-text {
    padding-right: 10px;
  }

  .more-button {
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  .modal-content {
    padding: 15px;
  }

  .feature {
    margin-bottom: 20px;
    padding: 10px;
  }

  .feature-title {
    font-size: 1rem;
    padding: 6px 12px;
  }

  .feature p {
    font-size: 0.9rem;
  }

  .close-button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}

/* 處理較小的手機螢幕 */
@media (max-width: 320px) {
  .hero-section {
    padding-top: 50%;
  }

  .language-selector, 
  .btn-primary, 
  .btn-secondary {
    font-size: 0.8rem;
    padding: 6px 10px;
  }

  .sub-text {
    padding-right: 5px;
  }
}

@media (max-width: 768px) {
  .more-button {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .more-button {
    padding: 7px 18px;
    font-size: 0.85rem;
  }
}

@media (max-width: 320px) {
  .more-button {
    padding: 6px 15px;
    font-size: 0.8rem;
  }
}
</style>
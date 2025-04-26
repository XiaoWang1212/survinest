<template>
  <div class="hero-section" @click="handleOutsideClick">
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

    <!-- 右上角登入按鈕 -->
    <div class="top-buttons">
      <button class="btn-primary">註冊 / 登入</button>
      <button class="btn-secondary">快速進入</button>
    </div>

    <!-- 主內容 -->
    <div>
      <p class="sub-text">
        災害來臨怎麼辦？別怕，SurviNest 用 AI 幫你找到最佳避難點、<br>打造完美防災包，讓你從容不迫、安心備戰！
      </p>
      <button class="more-button" @click="showModal = true">了解更多</button>
    </div>

    <!-- Modal -->
    <div class="modal" v-if="showModal">
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
  methods: {
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
    setLanguage(language) {
      this.currentLanguage = language;
      this.showLanguageDropdown = false; // 自動關閉
    },
    handleOutsideClick() {
      this.showLanguageDropdown = false; // 點外面自動關
    }
  }
}
</script>

<style scoped>
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
  padding-top: 29%;
}

/* 左上角語言選單 - 稍微變大 */
.language-wrapper {
  position: absolute;
  top: 20px;
  left: 20px;
}

.language-selector {
  position: relative;
  background-color: white;
  color: #1c1c4f;
  padding: 10px 15px; /* 調大 */
  font-size: 1rem; /* 調大 */
  border: 2px solid #1c1c4f;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
}

.language-dropdown {
  position: absolute;
  top: 45px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1001;
  min-width: 120px;
}

.language-option {
  padding: 8px 15px;
  cursor: pointer;
  white-space: nowrap;
}

.language-option:hover {
  background-color: #f2f2f2;
}

/* 右上角登入按鈕 */
.top-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-primary {
  background-color: #1c1c4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #131339;
}

.btn-secondary {
  background-color: white;
  color: #1c1c4f;
  padding: 10px 20px;
  border: 2px solid #1c1c4f;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #f2f2f2;
}

.sub-text {
  font-size: 1.3rem;
  font-weight: bold;
  color: #000000;
  line-height: 1.6;
  margin-bottom: 20px;
}

.more-button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.more-button:hover {
  background-color: #1a242f;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  text-align: left;
}

.feature {
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 5px;
  background-color: #ecf0f1;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

.feature p {
  font-size: 1rem;
  color: #34495e;
  line-height: 1.5;
}

.highlight {
  color: #c0392b;
  font-weight: bold;
}

.close-button {
  background-color: #e74c3c;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.close-button:hover {
  background-color: #c0392b;
}
</style>
<template>
    <header class="header">
      <nav class="navbar">
        <div class="navbar-container">
          <img src="@/assets/photo/survinestLogo.png" alt="Logo" class="logo-img">
          <router-link to="/" class="navbar-logo">
            <span class="logo-text">SurviNest</span>
            <span class="logo-tagline">智慧防災顧問</span>
          </router-link>
  
          <div class="navbar-toggle" @click="toggleMenu" :class="{ active: menuOpen }">
            <span class="toggle-bar"></span>
            <span class="toggle-bar"></span>
            <span class="toggle-bar"></span>
          </div>
  
          <div class="navbar-menu" :class="{ active: menuOpen }">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link" @click="closeMenu">
                  <span class="nav-icon">🏠</span>首頁
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/scan" class="nav-link" @click="closeMenu">
                  <span class="nav-icon">🔍</span>安全掃描
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/supplies" class="nav-link" @click="closeMenu">
                  <span class="nav-icon">🛒</span>防災物資
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/emergency" class="nav-link" @click="closeMenu">
                  <span class="nav-icon">🚨</span>緊急資源管理
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link" @click="closeMenu">
                  <span class="nav-icon">ℹ️</span>關於我們
                </router-link>
              </li>
            </ul>
            
            <div class="navbar-actions">
              <button class="action-button" @click="toggleDarkMode">
                <span v-if="darkMode">☀️</span>
                <span v-else>🌙</span>
              </button>
              <button class="action-button emergency-btn" @click="goToEmergency">
                <span class="emergency-icon">🆘</span>緊急資源管理
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <div class="alert-banner" v-if="showAlert">
        <div class="alert-content">
          {{ alertMessage }}
        </div>
        <button class="alert-close" @click="dismissAlert">×</button>
      </div>
    </header>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'NavBar',
    setup() {
      const router = useRouter()
      const menuOpen = ref(false)
      const darkMode = ref(false)
      
      const showAlert = ref(false)
      const alertMessage = ref('【演練通知】今日14:00將進行全國防災演習，請留意警報聲響。')
      
      // 假設從服務器獲取警報信息
      setTimeout(() => {
        showAlert.value = true
      }, 2000)
  
      const toggleMenu = () => {
        menuOpen.value = !menuOpen.value
        if (menuOpen.value) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      }
  
      const closeMenu = () => {
        menuOpen.value = false
        document.body.style.overflow = ''
      }
  
      const toggleDarkMode = () => {
        darkMode.value = !darkMode.value
        // 這裡可以實現深色模式切換邏輯
        // document.body.classList.toggle('dark-mode')
      }
  
      const goToEmergency = () => {
        closeMenu()
        router.push('/emergency')
      }
  
      const dismissAlert = () => {
        showAlert.value = false
      }
  
      return {
        menuOpen,
        darkMode,
        showAlert,
        alertMessage,
        toggleMenu,
        closeMenu,
        toggleDarkMode,
        goToEmergency,
        dismissAlert
      }
    }
  }
  </script>
  
  <style scoped>
  .logo-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    object-fit: cover;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  }
  
  .navbar {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    height: 70px;
  }
  
  .navbar-logo {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding-right: 20px;
  }
  
  .logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #e74c3c;
    line-height: 1;
  }
  
  .logo-tagline {
    font-size: 0.8rem;
    color: #7f8c8d;
  }
  
  .navbar-toggle {
    display: none;
    flex-direction: column;
    width: 30px;
    cursor: pointer;
  }
  
  .toggle-bar {
    height: 3px;
    width: 100%;
    background-color: #2c3e50;
    margin: 3px 0;
    transition: 0.3s;
  }
  
  .navbar-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
  
  .navbar-nav {
    display: flex;
    list-style: none;
  }
  
  .nav-item {
    margin: 0 5px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .nav-link:hover {
    background-color: #f8f9fa;
  }
  
  .router-link-active {
    color: #e74c3c;
    position: relative;
  }
  
  .router-link-active::after {
    content: '';
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 5px;
    height: 2px;
    background-color: #e74c3c;
  }
  
  .nav-icon {
    margin-right: 8px;
    font-size: 1.1em;
  }
  
  .navbar-actions {
    display: flex;
    align-items: center;
  }
  
  .action-button {
    padding: 8px 15px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    background: none;
    transition: background-color 0.3s;
  }
  
  .action-button:hover {
    background-color: #f8f9fa;
  }
  
  .emergency-btn {
    background-color: #e74c3c;
    color: white;
  }
  
  .emergency-btn:hover {
    background-color: #c0392b;
  }
  
  .emergency-icon {
    margin-right: 5px;
  }
  
  .alert-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f39c12;
    color: white;
    padding: 10px 20px;
    font-size: 0.9rem;
  }
  
  .alert-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 10px;
  }
  
  /* 響應式設計 */
  @media (max-width: 992px) {
    .navbar-toggle {
      display: flex;
    }
    
    .navbar-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      flex-direction: column;
      background-color: white;
      padding: 20px;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      z-index: 99;
      overflow-y: auto;
    }
    
    .navbar-menu.active {
      transform: translateX(0);
    }
    
    .navbar-toggle.active .toggle-bar:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .navbar-toggle.active .toggle-bar:nth-child(2) {
      opacity: 0;
    }
    
    .navbar-toggle.active .toggle-bar:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .navbar-nav {
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;
    }
    
    .nav-item {
      margin: 5px 0;
      width: 100%;
    }
    
    .nav-link {
      width: 100%;
      padding: 15px;
    }
    
    .navbar-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .action-button {
      width: 100%;
      margin: 5px 0;
      padding: 15px;
      text-align: center;
    }
  }
  </style>
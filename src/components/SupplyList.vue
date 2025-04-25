<template>
    <div class="supply-list">
      <div class="supply-header">
        <h1>防災物資清單</h1>
        <p class="subtitle">基本防災用品清單與存放建議</p>
      </div>
  
      <div class="category-tabs">
        <button 
          v-for="(category, index) in categories" 
          :key="index"
          :class="['tab-button', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
  
      <div class="supply-items">
        <div v-for="item in filteredItems" :key="item.id" class="supply-item">
          <div class="item-icon">{{ item.icon }}</div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <div class="item-tags">
              <span class="priority-tag" :class="'priority-' + item.priority">
                {{ priorityLabels[item.priority] }}
              </span>
              <span class="storage-tag">
                存放建議: {{ item.storage }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="supply-info-box">
        <h3>防災包存放建議</h3>
        <p>防災包應放置在家中容易取得且安全的位置，如入口處的鞋櫃旁或床頭櫃下方。確保全家人都知道防災包的位置，並定期檢查物資有效期。</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'SupplyList',
    setup() {
      const activeCategory = ref('essential')
      
      const categories = [
        { id: 'essential', name: '必備物資' },
        { id: 'food', name: '食物與飲水' },
        { id: 'first-aid', name: '醫療用品' },
        { id: 'tools', name: '工具與設備' },
        { id: 'special', name: '特殊需求' }
      ]
      
      const supplies = [
        // 必備物資
        { id: 1, name: '緊急聯絡卡', description: '包含家人電話、地址、緊急聯絡人等資訊', category: 'essential', priority: 'high', storage: '隨身攜帶', icon: '📝' },
        { id: 2, name: '手電筒', description: '建議使用LED手電筒，耗電量低且亮度高', category: 'essential', priority: 'high', storage: '床頭與入口處', icon: '🔦' },
        { id: 3, name: '收音機', description: '手搖或電池供電收音機，以獲取災情與救援資訊', category: 'essential', priority: 'high', storage: '防災包', icon: '📻' },
        
        // 食物與飲水
        { id: 4, name: '飲用水', description: '每人每天至少3公升，建議儲存3天份量', category: 'food', priority: 'high', storage: '陰涼處', icon: '💧' },
        { id: 5, name: '罐頭食品', description: '高熱量、易保存的罐頭食品，注意保存期限', category: 'food', priority: 'high', storage: '乾燥處', icon: '🥫' },
        { id: 6, name: '能量棒', description: '高熱量、輕便的應急食品', category: 'food', priority: 'medium', storage: '防災包', icon: '🍫' },
        
        // 醫療用品
        { id: 7, name: '急救箱', description: '包含繃帶、紗布、消毒藥水等基本醫療用品', category: 'first-aid', priority: 'high', storage: '浴室櫃', icon: '🩹' },
        { id: 8, name: '個人藥品', description: '慢性病患者的必備藥物，至少3-7天份量', category: 'first-aid', priority: 'high', storage: '冰箱或防災包', icon: '💊' },
        { id: 9, name: '口罩', description: '防塵、防煙霧用N95口罩', category: 'first-aid', priority: 'medium', storage: '防災包', icon: '😷' },
        
        // 工具與設備
        { id: 10, name: '多功能工具', description: '包含螺絲刀、小刀、開瓶器等功能', category: 'tools', priority: 'medium', storage: '工具箱或防災包', icon: '🔧' },
        { id: 11, name: '防水布', description: '可用於緊急避雨或地面隔離', category: 'tools', priority: 'medium', storage: '防災包', icon: '🧵' },
        { id: 12, name: '哨子', description: '求救用，聲音比喊叫更容易被發現', category: 'tools', priority: 'medium', storage: '防災包或鑰匙圈', icon: '📯' },
        
        // 特殊需求
        { id: 13, name: '嬰兒用品', description: '奶粉、尿布、濕紙巾等', category: 'special', priority: 'high', storage: '嬰兒房', icon: '👶' },
        { id: 14, name: '寵物用品', description: '寵物食品、水、簡易籠子、牽繩等', category: 'special', priority: 'medium', storage: '寵物活動區附近', icon: '🐾' },
        { id: 15, name: '老人用品', description: '老花眼鏡、助行器、特殊藥物等', category: 'special', priority: 'high', storage: '長者房間', icon: '👴' },
      ]
      
      const priorityLabels = {
        high: '最高優先',
        medium: '中度優先',
        low: '建議準備'
      }
      
      const filteredItems = computed(() => {
        return supplies.filter(item => item.category === activeCategory.value)
      })
      
      return {
        activeCategory,
        categories,
        filteredItems,
        priorityLabels
      }
    }
  }
  </script>
  
  <style scoped>
  .supply-list {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .supply-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .subtitle {
    color: #777;
    font-size: 1.1rem;
    margin-top: 10px;
  }
  
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .tab-button {
    padding: 10px 15px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tab-button.active {
    background-color: #3498db;
    color: white;
  }
  
  .supply-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .supply-item {
    display: flex;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .item-icon {
    font-size: 32px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details h3 {
    margin-top: 0;
    margin-bottom: 8px;
  }
  
  .item-details p {
    margin-bottom: 10px;
    color: #555;
  }
  
  .item-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .priority-tag, .storage-tag {
    font-size: 0.8rem;
    padding: 3px 8px;
    border-radius: 4px;
  }
  
  .priority-high {
    background-color: #ffecee;
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
  
  .storage-tag {
    background-color: #ebf5fb;
    color: #3498db;
  }
  
  .supply-info-box {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }
  </style>
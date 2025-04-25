<template>
    <div class="supplies-page">
      <SupplyList />
      <div class="recommendations">
        <h2>個人化防災物資建議</h2>
        <form @submit.prevent="generateRecommendations">
          <div class="form-group">
            <label>家庭成員數</label>
            <input v-model="familySize" type="number" min="1" />
          </div>
          <div class="form-group">
            <label>特殊需求</label>
            <textarea v-model="specialNeeds"></textarea>
          </div>
          <button type="submit">生成建議清單</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import SupplyList from '@/components/SupplyList.vue'
  import { ref } from 'vue'
  
  export default {
    name: 'SuppliesPage',
    components: {
      SupplyList
    },
    setup() {
      const familySize = ref(1)
      const specialNeeds = ref('')
  
      const generateRecommendations = async () => {
        // 這裡將使用 Bedrock 生成個人化建議
      }
  
      return {
        familySize,
        specialNeeds,
        generateRecommendations
      }
    }
  }
  </script>
  
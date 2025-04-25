<template>
  <div class="survival-kit-page" :class="{ 'transitioning': isTransitioning }">
    <div class="switch-container">
      <input type="checkbox" id="kitSwitch" class="switch-checkbox" @change="switchToScan" checked>
      <label for="kitSwitch" class="switch-label" title="切換到安全掃描功能">
        <span class="switch-button"></span>
      </label>
    </div>
    <h1>防災包功能</h1>
    <p>這裡將顯示防災包推薦物品的內容。</p>
    <!-- 後續可加入防災包物品清單與互動功能 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SurvivalKitPage',
  setup() {
    const router = useRouter()
    const isTransitioning = ref(false)

    const switchToScan = async () => {
      isTransitioning.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push({ name: 'ScanPage' })
    }

    return {
      isTransitioning,
      switchToScan
    }
  }
}
</script>

<style scoped>
.survival-kit-page {
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  transition: transform 0.5s ease;
}

.switch-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.switch-checkbox {
  display: none;
}

.switch-label {
  display: block;
  width: 60px;
  height: 30px;
  background: #e0e0e0;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-label:hover {
  background: #d0d0d0;
}

.switch-button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.switch-checkbox:checked + .switch-label {
  background: #2196F3;
}

.switch-checkbox:checked + .switch-label .switch-button {
  transform: translateX(30px);
}

.survival-kit-page.transitioning {
  animation: slideLeft 0.5s ease forwards;
}

@keyframes slideLeft {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 100% 0 0);
  }
}
</style>
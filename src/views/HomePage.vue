<template>
  <div class="home">
    <HomeHero />
    <div class="features-section">
      <h2>SurviNest 防災顧問</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>AI 空間掃描</h3>
          <p>智能辨識危險源與逃生路線</p>
        </div>
        <div class="feature-card">
          <h3>個人化物資建議</h3>
          <p>根據家庭需求推薦防災用品</p>
        </div>
        <div class="feature-card">
          <h3>緊急求生指南</h3>
          <p>智能配給資源管理系統</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeHero from "@/components/HomeHero.vue";

  export default {
    name: "HomePage",
    components: {
      HomeHero,
    },
  };
</script>

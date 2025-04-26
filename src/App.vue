<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans TC', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  display: flex;
}

.main-content .left {
  background-color: #D7B2A5;
  flex: 1;
}

.main-content .right {
  background-color: #F8F6F3;
  flex: 1;
}

h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin-bottom: 15px;
}

button {
  cursor: pointer;
}

a {
  color: #3498db;
}


</style>
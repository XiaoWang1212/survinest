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
  min-height: 100vh;
  width: 100vw;
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
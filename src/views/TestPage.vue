<template>
    <div class="hello">
      <h1>{{ message }}</h1>
      <button @click="callSayHello">打招呼</button>
    </div>
  </template>
  
  <script>
  import { post } from 'aws-amplify/api';
  
  export default {
    name: 'HelloWorld',
    data() {
      return {
        message: '',
        name: '小明'
      }
    },
    methods: {
      async callSayHello() {
        try {
          const apiName = 'api'; // 這應該與您的 Amplify 配置中的名稱匹配
          const path = '/say-hello';
          const options = {
            body: { name: this.name }
          };
          
          const response = await post(apiName, path, options);
          this.message = response.data;
        } catch (error) {
          console.error('API 調用失敗:', error);
          this.message = '無法連接到後端服務';
        }
      }
    }
  }
  </script>
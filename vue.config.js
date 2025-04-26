const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://gidhnf5qp4.execute-api.us-west-2.amazonaws.com/dev',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // 將 '/api/compute' 重寫為 '/compute'
        }
      }
    }
  }
});

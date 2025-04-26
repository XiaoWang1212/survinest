module.exports = {
    root: true,  // 這會讓此檔案成為 Amplify 目錄的根配置
    env: {
      node: true,
      es2022: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      // 關閉所有規則，專門用於 Amplify 目錄
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "comma-dangle": "off",
      "no-trailing-spaces": "off",
      "semi": "off"
    }
  };
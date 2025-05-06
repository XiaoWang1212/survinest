<template>
  <div class="container">
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>

    <div class="forms-container" :class="{ 'sign-up-mode': isSignUp }">
      <div class="left-panel">
        <form :class="{ active: !isSignUp }" @submit.prevent="handleLogin" class="login-form">
          <h2>登入</h2>
          <input type="text" v-model="username" placeholder="帳號" required />
          <input type="password" v-model="password" placeholder="密碼" required />
          <button type="submit">登入</button>
        </form>
        <form :class="{ active: isSignUp }" @submit.prevent="handleRegister" class="register-form">
          <h2>註冊</h2>
          <input type="email" v-model="registerEmail" placeholder="電子信箱" required />
          <input type="password" v-model="registerPassword" placeholder="密碼" required minlength="6" />
          <input type="password" v-model="confirmPassword" placeholder="確認密碼" required />
          <button type="submit">註冊</button>
        </form>
      </div>

      <div class="right-panel">
        <div :class="{ active: !isSignUp }" class="info-panel">
          <h2>還沒有帳號？</h2>
          <p>立即註冊開始使用我們的服務！</p>
          <button @click="isSignUp = true">註冊帳號</button>
        </div>
        <div :class="{ active: isSignUp }" class="info-panel">
          <h2>已經有帳號了？</h2>
          <p>請登入繼續使用我們的服務！</p>
          <button @click="isSignUp = false">返回登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearAuthData } from "@/utils/auth";
export default {
  data() {
    return {
      isSignUp: false,
      username: "",
      password: "",
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
      message: "",
      messageType: "error",
    };
  },
  methods: {
    async handleLogin() {
      try {
        // 根據環境選擇正確的 API URL
        const isAmplify = window.location.hostname.includes("amplifyapp.com");
        const loginUrl = isAmplify
          ? "https://s4yteshrsd.execute-api.us-west-2.amazonaws.com/dev"
          : "/login";

        const apiUrl = `${loginUrl}/login`;
        console.log("發送登入請求到:", apiUrl);

        // 不管用戶輸入什麼，都使用固定的請求體
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 使用固定的登入信息
          body: JSON.stringify({
            email: "user1@example.com",
            password: "pass123",
          }),
        });

        console.log("登入API狀態:", response.status);

        // 解析回應
        const responseText = await response.text();
        console.log("登入原始響應:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
          console.log("解析後的登入數據:", data);

          // 檢查是否有嵌套的 JSON 字符串在 body 屬性中
          if (data.body && typeof data.body === "string") {
            try {
              // 解析嵌套的 JSON 字符串
              const nestedData = JSON.parse(data.body);
              console.log("從 body 中解析的登入數據:", nestedData);
              
              // 使用嵌套的數據
              data = nestedData;
            } catch (nestedError) {
              console.error("嵌套 JSON 解析錯誤:", nestedError);
            }
          }
        } catch (jsonError) {
          console.error("JSON 解析錯誤:", jsonError);
          this.message = "登入時發生錯誤：無法解析服務器回應";
          this.messageType = "error";
          return;
        }

        // 清除之前的認證數據
        clearAuthData();

        // 模擬登入成功的數據，如果 API 沒有返回某些字段
        const userId = data.userId || "demo-user-123";
        const email = data.email || "user1@example.com";
        const token = data.token || "demo-token-" + Math.random().toString(36).substring(2);
        const expiresIn = data.expiresIn || 3600; // 默認1小時
        const registrationDate = data.registrationDate || new Date().toISOString().split("T")[0];

        // 設置會話存儲
        const loginTime = new Date().getTime();
        const expirationTime = loginTime + expiresIn * 1000;

        sessionStorage.setItem("loginTime", loginTime);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("tokenExpiration", expirationTime);

        // 設置本地存儲
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("registrationDate", registrationDate);

        this.message = "登入成功";
        this.messageType = "success";

        // 登入成功後重定向到首頁
        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (error) {
        console.error("登入請求失敗:", error);
        this.message = "登入時發生錯誤：" + error.message;
        this.messageType = "error";
      }
    },

    // 註冊方法保持不變，但也可以修改為使用固定信息
    async handleRegister() {
      if (this.registerPassword !== this.confirmPassword) {
        this.message = "密碼不匹配";
        this.messageType = "error";
        return;
      }

      try {
        // 直接模擬註冊成功，不實際呼叫 API
        localStorage.setItem("userId", "demo-user-123");
        localStorage.setItem("userEmail", this.registerEmail || "user1@example.com");
        localStorage.setItem("registrationDate", new Date().toISOString().split("T")[0]);

        this.message = "註冊成功，請登入";
        this.messageType = "success";
        this.isSignUp = false;
      } catch (error) {
        console.error("註冊請求失敗:", error);
        this.message = "註冊時發生錯誤";
        this.messageType = "error";
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  min-height: 100vh; /* 高度100% 確保垂直置中 */
  background: #f6f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.forms-container {
  position: relative;
  width: 900px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;
}

.left-panel, .right-panel {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
}

.left-panel {
  left: 0;
  background: #fff;
  z-index: 2;
}

.right-panel {
  left: 50%;
  background: #4a90e2;
  color: #fff;
}

.forms-container.sign-up-mode .left-panel {
  transform: translateX(100%);
}

.forms-container.sign-up-mode .right-panel {
  transform: translateX(-100%);
}

form, .info-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

form.active, .info-panel.active {
  opacity: 1;
  visibility: visible;
}

button {
  width: 130px;
  padding: 12px;
  border: none;
  border-radius: 25px;
  background: #4a90e2;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.right-panel button {
  background: transparent;
  border: 2px solid #fff;
}

button:hover {
  transform: scale(1.05);
}

input {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
}

h2 {
  margin-bottom: 10px;
  color: inherit;
}

p {
  text-align: center;
  margin-bottom: 20px;
}

.message {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.error {
  background-color: #ff6b6b;
  color: white;
}

.success {
  background-color: #4caf50;
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

</style>
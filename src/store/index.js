export default {
  state: {
    currentLanguage: '繁體中文',
    translations: {
      '繁體中文': {
        learnMore: '了解更多',
        registerLogin: '註冊 / 登入',
        quickEnter: '快速進入',
        close: '關閉',
        features: {
          evacuation: {
            title: '🗺️ 地震逃生路線及躲避位置建議',
            description: '只要拍攝家中場景，SurviNest 即可辨識危險源與可逃生出口，建構完整逃生路線及安全的躲避位置。'
          },
          emergencyKit: {
            title: '🎒 防災包位置及內容建議',
            description: '根據家庭成員數及體重等推薦備品清單與儲藏建議。'
          },
          survivalSystem: {
            title: '🍽️ 災中輔助存活系統',
            description: '若受困時可啟用，SurviNest 根據現有糧食量與個人身體狀況自動排餐，陪你等待救援！'
          }
        }
      },
      'English': {
        learnMore: 'Learn More',
        registerLogin: 'Register / Login',
        quickEnter: 'Quick Start',
        close: 'Close',
        features: {
          evacuation: {
            title: '🗺️ Earthquake Evacuation Routes & Safety Spots',
            description: 'Simply take photos of your home, and SurviNest will identify hazards and exits to build complete evacuation routes and safe shelter spots.'
          },
          emergencyKit: {
            title: '🎒 Emergency Kit Recommendations',
            description: 'Get personalized supply lists and storage suggestions based on family size and individual needs.'
          },
          survivalSystem: {
            title: '🍽️ Disaster Survival Assistant',
            description: 'When trapped, activate SurviNest to automatically plan meals based on available food and your physical condition while waiting for rescue!'
          }
        }
      }
    }
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.currentLanguage = language;
    }
  },
  actions: {
    changeLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
      // 可以在這裡添加本地儲存，保存用戶的語言偏好
      localStorage.setItem('preferredLanguage', language);
    }
  },
  getters: {
    currentLanguage: state => state.currentLanguage,
    translations: state => state.translations[state.currentLanguage]
  }
}
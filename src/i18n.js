import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言资源
const resources = {
    en: {
      translation: {
        "welcome": "Welcome",
        "description": "This is a sample application"
      }
    },
    zh: {
      translation: {
        "welcome": "欢迎",
        "description": "这是一个示例应用程序"
      }
    }
  };
  
  i18n
    .use(initReactI18next) // 将 i18next 传递给 react-i18next
    .init({
      resources,
      lng: "en", // 默认语言
      fallbackLng: "en",
      interpolation: {
        escapeValue: false // React 已经进行转义处理
      }
    });
  
  export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from "react-native";
import RNLanguageDetector from 'i18next-react-native-language-detector';
import en from './Components/translations/en.json'
import es from './Components/translations/es.json'
import ar from './Components/translations/ar.json'
i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      // lng: I18nManager.isRTL ? 'ar' : 'en',
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      ar:{
        translation: ar,
      }
  
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
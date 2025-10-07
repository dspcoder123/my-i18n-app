import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    resources: {
      en: {
        common: require('../public/locales/en/common.json'),
      },
      es: {
        common: require('../public/locales/es/common.json'),
      },
      fr: {
        common: require('../public/locales/fr/common.json'),
      },
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    debug: true,
    fallbackLng: 'eng'
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },
    // resources:{
    //     en:{
    //         translation:{
    //             "bestseller": "elo1233"
    //         }
    //     }
    // }
  });


export default i18n;
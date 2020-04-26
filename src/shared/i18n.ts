import i18next from 'i18next';
import backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

import i18next from 'i18next';
import backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

export const LANGUAGES = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
];

i18next
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    debug: true,
    whitelist: ['en', 'ru'],
    fallbackLng: 'en',
    ns: ['translation', 'feedback', 'form', 'static'],
    defaultNS: 'translation',
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

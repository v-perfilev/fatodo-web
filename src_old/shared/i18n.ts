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

export const LANGUAGE_MAP = LANGUAGES.reduce((map, lang) => map.set(lang.code, lang.name), new Map());

export const initLanguages = i18next
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    debug: false,
    whitelist: ['en', 'ru'],
    fallbackLng: 'en',
    ns: [
      'translation',
      'feedback',
      'snack',
      'static',
      'common',
      'account',
      'group',
      'item',
      'contact',
      'chat',
      'comment',
    ],
    defaultNS: 'translation',
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18next;
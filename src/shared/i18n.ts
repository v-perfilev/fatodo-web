import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';

require('moment/locale/en-gb.js');
require('moment/locale/ru.js');

export const languages = [
  {
    name: 'English',
    code: 'EN',
  },
  {
    name: 'Русский',
    code: 'RU',
  },
];

export const initI18n = i18next
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    debug: false,
    compatibilityJSON: 'v3',
    fallbackLng: 'EN',
    ns: [
      'account',
      'calendar',
      'chat',
      'comment',
      'common',
      'contact',
      'event',
      'feedback',
      'group',
      'item',
      'push',
      'snack',
      'translation',
      'user',
    ],
    defaultNS: 'translation',
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .finally();

export default i18next;

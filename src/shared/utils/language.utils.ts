import i18n from '../i18n';
import {InitOptions} from 'i18next';

export const getOptions = (): InitOptions => i18n.options;

export const getLanguages = (): string[] => i18n.languages;

export const getLanguage = (): string => i18n.language;

export const setLanguage = (code: string): void => {
  i18n.changeLanguage(code).then();
};

export const setLanguageFromAccountResponse = (response): void => {
  const code = response?.value?.language;
  if (code && getLanguage() !== code) {
    setLanguage(code);
  }
};

import i18n from '../i18n';

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

import i18n from '../i18n';
import {UserAccount} from '../../models/User';
import {DateUtils} from './DateUtils';

export class LanguageUtils {
  public static getLanguages = (): readonly string[] => {
    return i18n.languages;
  };

  public static getLanguage = (): string => {
    const presentedLang = i18n.languages.find((l) => i18n.language.startsWith(l));
    return presentedLang || LanguageUtils.getFallbackLanguage();
  };

  public static getFallbackLanguage = (): string => {
    return i18n.languages[0];
  };

  public static setLanguage = (code: string): void => {
    DateUtils.resetLocale(code);
    i18n.changeLanguage(code).finally();
  };

  public static setLanguageFromUser = (account: UserAccount): void => {
    const code = account?.info?.language?.toLowerCase();
    code && LanguageUtils.setLanguage(code);
  };
}

import i18n from '../i18n';
import {InitOptions} from 'i18next';
import {UserAccount} from '../../models/user.model';

export class LanguageUtils {
  public static getOptions = (): InitOptions => i18n.options;

  public static getLanguages = (): string[] => i18n.languages;

  public static getLanguage = (): string => i18n.language;

  public static setLanguage = (code: string): void => {
    i18n.changeLanguage(code).then();
  };

  public static setLanguageFromUser = (account: UserAccount): void => {
    const code = account?.language;
    if (code && LanguageUtils.getLanguage() !== code) {
      LanguageUtils.setLanguage(code);
    }
  };
}

import initI18n from '../i18n';

export class TranslationUtils {
  public static getFeedbackTranslation = (message: string): string =>
    TranslationUtils.getTranslation('feedback', message);

  public static getSnackTranslation = (message: string): string => TranslationUtils.getTranslation('snack', message);

  public static getTranslation = (key: string, message: string): string =>
    message && initI18n.exists(key + ':' + message) ? initI18n.t(key + ':' + message) : '';
}

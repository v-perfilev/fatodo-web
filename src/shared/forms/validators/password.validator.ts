import * as Yup from 'yup';
import i18n from 'i18next';
import {passwordRegex, passwordStrengthRegex} from './_constants';

export const passwordValidator = Yup.string()
  .required(() => i18n.t('account:fields.password.required'))
  .matches(passwordRegex, {message: () => i18n.t('account:fields.password.invalid')})
  .matches(passwordStrengthRegex, {message: () => i18n.t('account:fields.password.strength')})
  .min(8, () => i18n.t('account:fields.password.min8'))
  .max(20, () => i18n.t('account:fields.password.max20'));

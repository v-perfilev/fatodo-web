import {AsyncValidator} from '../../shared/utils/yup.utils';
import i18n from 'i18next';
import UserService from '../../services/user.service';
import * as Yup from 'yup';

export const emailValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:fields.email.required'))
    .email(() => i18n.t('form:fields.email.notValid')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:fields.email.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isEmailUnique(value)).data === true,
  }
);

const usernameRegex = /^[A-Za-z\d]+$/;
export const usernameValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:fields.username.required'))
    .matches(usernameRegex, {message: () => i18n.t('form:fields.username.invalid')})
    .min(5, () => i18n.t('form:fields.username.min5'))
    .max(20, () => i18n.t('form:fields.username.max20')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:fields.username.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isUsernameUnique(value)).data === true,
  }
);

const passwordRegex = /^[A-Za-z\d]+$/;
export const passwordStrengthMap = ['(?=.*[A-Z])', '(?=.*[a-z])', '(?=.*\\d)'];
export const passwordStrengthPrefix = '^(';
export const passwordStrengthPostfix = '.*)$';
const passwordStrengthRegex = (): RegExp => {
  const body = passwordStrengthMap.reduce((acc, val) => acc + val);
  const regexpString = passwordStrengthPrefix + body + passwordStrengthPostfix;
  return new RegExp(regexpString);
};
export const passwordValidator = Yup.string()
  .required(() => i18n.t('form:fields.password.required'))
  .matches(passwordRegex, {message: () => i18n.t('form:fields.password.invalid')})
  .matches(passwordStrengthRegex(), {message: () => i18n.t('form:fields.password.strength')})
  .min(8, () => i18n.t('form:fields.password.min8'))
  .max(20, () => i18n.t('form:fields.password.max20'));

export const repeatPasswordValidator = Yup.string()
  .required(() => i18n.t('form:fields.repeatPassword.required'))
  .when('password', {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref('password')], () => i18n.t('form:fields.repeatPassword.notEqual')),
  });

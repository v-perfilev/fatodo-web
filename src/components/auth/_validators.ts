import {AsyncValidator} from '../../utils/yup.helpers';
import i18n from 'i18next';
import UserService from '../../services/user.service';
import * as Yup from 'yup';

export const emailValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:email.required'))
    .email(() => i18n.t('form:email.notValid')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:email.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isEmailUnique(value)) == true,
  },
);

const usernameRegex = /^[A-Za-z\d]+$/;
export const usernameValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:username.required'))
    .matches(usernameRegex, {message: () => i18n.t('form:username.invalid')})
    .min(5, () => i18n.t('form:username.min5'))
    .max(20, () => i18n.t('form:username.max20')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:username.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isUsernameUnique(value)) == true,
  },
);

const passwordRegex = /^[A-Za-z\d!@#$%]+$/;
const passwordStrengthRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{0,50})$/;
export const passwordValidator = Yup.string()
  .required(() => i18n.t('form:password.required'))
  .matches(passwordRegex, {message: () => i18n.t('form:password.invalid')})
  .matches(passwordStrengthRegex, {message: () => i18n.t('form:password.strength')})
  .min(8, () => i18n.t('form:password.min8'))
  .max(20, () => i18n.t('form:password.max20'));

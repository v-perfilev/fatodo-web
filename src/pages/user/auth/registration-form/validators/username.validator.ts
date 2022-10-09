import * as Yup from 'yup';
import i18n from 'i18next';
import {AsyncValidator} from '../../../../../shared/utils/yup.utils';
import UserService from '../../../../../services/user.service';
import {usernameRegex} from '../../../../../shared/forms/validators/_constants';

export const usernameValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('account:fields.username.required'))
    .matches(usernameRegex, {message: () => i18n.t('account:fields.username.invalid')})
    .min(5, () => i18n.t('account:fields.username.min5'))
    .max(20, () => i18n.t('account:fields.username.max20')),
  {
    name: 'unique',
    message: (): string => i18n.t('account:fields.username.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.doesUsernameExist(value)).data === false,
  },
);

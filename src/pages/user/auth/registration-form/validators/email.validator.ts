import {AsyncValidator} from '../../../../../shared/utils/yup.utils';
import * as Yup from 'yup';
import i18n from 'i18next';
import UserService from '../../../../../services/user.service';

export const emailValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('account:fields.email.required'))
    .email(() => i18n.t('account:fields.email.notValid')),
  {
    name: 'unique',
    message: (): string => i18n.t('account:fields.email.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.doesEmailExist(value)).data === false,
  }
);

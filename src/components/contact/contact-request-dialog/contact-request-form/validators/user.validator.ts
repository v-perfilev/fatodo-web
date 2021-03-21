import {AsyncValidator} from '../../../../../shared/utils/yup.utils';
import * as Yup from 'yup';
import i18n from 'i18next';
import UserService from '../../../../../services/user.service';

export const userValidator = (currentLogin: string, currentEmail: string): AsyncValidator =>
  new AsyncValidator(
    Yup.string()
      .required(() => i18n.t('contact:addContact.fields.user.required'))
      .matches(new RegExp('^(?!' + currentLogin + '$).*$'), {
        message: () => i18n.t('contact:addContact.fields.user.current'),
      })
      .matches(new RegExp('^(?!' + currentEmail + '$).*$'), {
        message: () => i18n.t('contact:addContact.fields.user.current'),
      }),
    {
      name: 'exists',
      message: (): string => i18n.t('contact:addContact.fields.user.notRegistered'),
      test: async (value): Promise<boolean> => (await UserService.doesUsernameOrEmailExist(value)).data === true,
    }
  );

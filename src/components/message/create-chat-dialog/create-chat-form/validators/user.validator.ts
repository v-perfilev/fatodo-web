import {AsyncValidator} from '../../../../../shared/utils/yup.utils';
import * as Yup from 'yup';
import i18n from 'i18next';
import UserService from '../../../../../services/user.service';

export const userValidator = (currentLogin: string, currentEmail: string): AsyncValidator =>
  new AsyncValidator(
    Yup.string()
      .required(() => i18n.t('message:createChat.fields.users.required'))
      .matches(new RegExp('^(?!' + currentLogin + '$).*$'), {message: () => i18n.t('message:createChat.fields.users.current')})
      .matches(new RegExp('^(?!' + currentEmail + '$).*$'), {message: () => i18n.t('message:createChat.fields.users.current')}),
    {
      name: 'exists',
      message: (): string => i18n.t('message:createChat.fields.users.notRegistered'),
      test: async (value): Promise<boolean> => (await UserService.doesEmailOrUsernameExist(value)).data === false
    }
  );

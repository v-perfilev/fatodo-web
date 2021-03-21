import {AsyncValidator} from '../../../../../shared/utils/yup.utils';
import * as Yup from 'yup';
import i18n from 'i18next';
import UserService from '../../../../../services/user.service';

export const userValidator = (currentLogin: string): AsyncValidator =>
  new AsyncValidator(
    Yup.string().matches(new RegExp('^(?!' + currentLogin + '$).*$'), {
      message: () => i18n.t('message:createChat.fields.users.current'),
    }),
    {
      name: 'exists',
      message: (): string => i18n.t('message:createChat.fields.users.notRegistered'),
      test: async (value: string): Promise<boolean> => {
        return !value || (value.trim() && (await UserService.doesUsernameExist(value)).data === true);
      },
    }
  );

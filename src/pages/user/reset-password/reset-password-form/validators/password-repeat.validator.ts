import * as Yup from 'yup';
import i18n from 'i18next';

export const passwordRepeatValidator = Yup.string()
  .required(() => i18n.t('account:fields.repeatPassword.required'))
  .when('password', {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref('password')], () => i18n.t('account:fields.repeatPassword.notEqual')),
  });

import React, {FC} from 'react';
import {accountFormStyles} from './_styles';
import {PageSubheader} from '../../common/surfaces/page-subheader';
import {PageDivider} from '../../common/surfaces/page-divider';
import {PageSpacer} from '../../common/surfaces/page-spacer';
import {Box} from '@material-ui/core';
import {LoadingButton} from '../../common/controls/loading-button';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {AccountPasswordFormUtils, AccountPasswordFormValues} from './_form';
import * as Yup from 'yup';
import {passwordValidator} from '../common/_validators';
import {PasswordInput} from '../../common/inputs/password-input';
import {PasswordStrengthBar} from '../password-strength-bar';
import i18n from 'i18next';
import {compose} from 'recompose';
import {SnackState} from '../../../shared/contexts/snack-context';
import UserService from '../../../services/user.service';
import {withSnackContext} from '../../../shared/hoc/with-snack';

type Props = FormikProps<any> & SnackState;

const AccountPasswordForm: FC<Props> = ({values, isValid, isSubmitting}: Props) => {
  const classes = accountFormStyles();
  const {t} = useTranslation();

  return (
    <>
      <PageSubheader title={t('account:changePassword.title')} />
      <PageDivider />
      <Form className={classes.form}>
        <PasswordInput name="oldPassword" label={t('account:fields.oldPassword.label')} />
        <PasswordInput name="newPassword" label={t('account:fields.newPassword.label')} />
        <PasswordStrengthBar password={values.newPassword} />
        <PageSpacer />
        <Box className={classes.buttons}>
          <LoadingButton type="submit" color="secondary" disabled={!isValid || isSubmitting} loading={isSubmitting}>
            {t('account:changePassword.submit')}
          </LoadingButton>
        </Box>
      </Form>
    </>
  );
};

const formik = withFormik<Props, AccountPasswordFormValues>({
  mapPropsToValues: () => AccountPasswordFormUtils.mapAccountToValues(),

  validationSchema: () =>
    Yup.object().shape({
      oldPassword: Yup.string().required(i18n.t('account:fields.password.required')),
      newPassword: passwordValidator,
    }),

  validateOnMount: true,

  handleSubmit: (
    values: AccountPasswordFormValues,
    {setSubmitting, props}: FormikBag<Props, AccountPasswordFormValues>
  ) => {
    const {handleCode, handleResponse} = props;

    const data = AccountPasswordFormUtils.mapValuesToDTO(values);

    setSubmitting(true);
    UserService.changePassword(data)
      .then(() => {
        handleCode('auth.afterChangePassword', 'info');
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
});

export default compose(withSnackContext, formik)(AccountPasswordForm);

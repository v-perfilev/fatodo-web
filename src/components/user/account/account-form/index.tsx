import React, {FC} from 'react';
import {accountFormStyles} from '../_styles';
import {Box} from '@material-ui/core';
import {ImageUpload, SelectInput, TextInput} from '../../../common/inputs';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {UserAccount} from '../../../../models/user.model';
import {LoadingButton} from '../../../common/controls';
import {PageSpacer} from '../../../common/surfaces';
import {LANGUAGES} from '../../../../shared/i18n';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import UserService from '../../../../services/user.service';
import {AccountFormUtils, AccountFormValues} from './_form';
import {flowRight} from 'lodash';

type BaseProps = {
  account: UserAccount;
  requestAccountData: () => void;
};

type Props = FormikProps<AccountFormValues> & SnackState & BaseProps;

const AccountForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = accountFormStyles();
  const {t} = useTranslation();

  const languageMap = new Map();
  LANGUAGES.forEach((value) => languageMap.set(value.code, value.name));

  return (
    <Form className={classes.form}>
      <TextInput name="username" label={t('account:fields.username.label')} required />
      <TextInput name="firstname" label={t('account:fields.firstname.label')} />
      <TextInput name="lastname" label={t('account:fields.lastname.label')} />
      <SelectInput name="language" label={t('account:fields.language.label')} options={languageMap} required />
      <ImageUpload
        filenameName="imageFilename"
        contentName="imageContent"
        label={t('account:fields.image.label')}
        preview
      />
      <PageSpacer />
      <Box className={classes.buttons}>
        <LoadingButton type="submit" color="secondary" disabled={!isValid || isSubmitting} loading={isSubmitting}>
          {t('account:account.submit')}
        </LoadingButton>
      </Box>
    </Form>
  );
};

const formik = withFormik<Props, AccountFormValues>({
  mapPropsToValues: ({account}: Props) => AccountFormUtils.mapPropsToValues(account),
  validationSchema: ({account}: Props) => AccountFormUtils.validationSchema(account),
  validateOnMount: true,

  handleSubmit: (values: AccountFormValues, {setSubmitting, props}: FormikBag<Props, AccountFormValues>) => {
    const {account, requestAccountData, handleCode, handleResponse} = props;

    const formData = AccountFormUtils.mapValuesToFormData(values, account);

    UserService.updateAccount(formData)
      .then(() => {
        handleCode('auth.afterUpdateAccount', 'info');
        requestAccountData();
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, formik])(AccountForm);

import React, {FC} from 'react';
import {accountFormStyles} from './_styles';
import {Box} from '@material-ui/core';
import {TextInput} from '../../common/inputs/text-input';
import {ImageUpload} from '../../common/inputs/image-upload';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {AccountFormUtils, AccountFormValues} from './_form';
import {compose} from 'recompose';
import {useTranslation} from 'react-i18next';
import {UserAccount} from '../../../models/user.model';
import * as Yup from 'yup';
import {LoadingButton} from '../../common/controls/loading-button';
import {PageSpacer} from '../../common/surfaces/page-spacer';
import {usernameChangeValidator} from '../common/_validators';
import {SelectInput} from '../../common/inputs/select-input';
import {LANGUAGES} from '../../../shared/i18n';
import {withSnackContext} from '../../../shared/hoc/with-snack';
import {SnackState} from '../../../shared/contexts/snack-context';
import UserService from '../../../services/user.service';

type Props = FormikProps<any> &
  SnackState & {
  account: UserAccount;
  requestAccountData: () => void;
};

const AccountForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = accountFormStyles();
  const {t} = useTranslation();

  const languageMap = new Map();
  LANGUAGES.forEach((value) => languageMap.set(value.code, value.name));

  return (
    <Form className={classes.form}>
      <TextInput name="username" label={t('account:fields.username.label')} required />
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
  mapPropsToValues: ({account}: Props) => AccountFormUtils.mapAccountToValues(account),

  validationSchema: ({account}: Props) =>
    Yup.object().shape({
      username: usernameChangeValidator(account.username).check()
    }),

  validateOnMount: true,

  handleSubmit: (values: AccountFormValues, {setSubmitting, props}: FormikBag<Props, AccountFormValues>) => {
    const {account, requestAccountData, handleCode, handleResponse} = props;
    const data = AccountFormUtils.mapValuesToFormData(values, account);

    UserService.updateAccount(data)
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
  }
});

export default compose(withSnackContext, formik)(AccountForm);

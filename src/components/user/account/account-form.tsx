import React, {FC} from 'react';
import {accountFormStyles} from './_styles';
import {Box, Grid} from '@material-ui/core';
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

type Props = FormikProps<any> & {
  account: UserAccount;
};

const AccountForm: FC<Props> = ({account, isValid, isSubmitting}: Props) => {
  const classes = accountFormStyles();
  const {t} = useTranslation();

  return (
    <Form className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextInput name="username" label={t('account:fields.username.label')} />
        </Grid>
        <Grid item xs={12}>
          <TextInput name="language" label={t('account:fields.language.label')} />
        </Grid>
        <Grid item xs={12}>
          <ImageUpload
            filenameName="imageFilename"
            contentName="imageContent"
            label={t('account:fields.image.label')}
            preview
          />
        </Grid>
      </Grid>
      <PageSpacer />
      <Box className={classes.buttons}>
        <LoadingButton
          type="submit"
          color="secondary"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          {t('account:account.submit')}
        </LoadingButton>
      </Box>
    </Form>
  );
};

const formik = withFormik<Props, AccountFormValues>({
  mapPropsToValues: ({account}: Props) => AccountFormUtils.mapAccountToValues(account),

  validationSchema: ({account}: Props) => Yup.object().shape({
    username: usernameChangeValidator(account.username).check()
  }),

  validateOnMount: true,

  handleSubmit: (values: AccountFormValues, {setSubmitting, props}: FormikBag<Props, AccountFormValues>) => {
    const {account} = props;
    const data = AccountFormUtils.mapValuesToFormData(values, account);
  }
});

export default compose(formik)(AccountForm);

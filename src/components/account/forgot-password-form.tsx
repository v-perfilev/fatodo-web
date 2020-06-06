import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-material-ui';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import * as React from 'react';
import {FC} from 'react';
import i18n from '../../shared/i18n';
import {authFormStyles} from './_styles';
import {Trans, useTranslation, withTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AccountService from '../../services/account.service';
import LoadingButton from '../common/buttons/loading-button';

interface ComponentProps {
  onSuccess?: () => void;
}

const mapDispatchToProps = {login};
const connector = connect(null, mapDispatchToProps);

type Props = ComponentProps & FormikProps<any> & ConnectedProps<typeof connector>;

const ForgotPasswordForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();
  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="user" label={t('form:fields.user.label')} fullWidth={true} />
      <LoadingButton
        type="submit"
        color="secondary"
        fullWidth={true}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      >
        <Trans i18nKey={'form:forgotPassword.submit'} />
      </LoadingButton>
    </Form>
  );
};

interface FormValues {
  user: string;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    user: '',
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('form:fields.user.required')),
  }),

  isInitialValid: false,
  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    AccountService.requestResetPasswordCode(values.user)
      .then(() => {
        if (props.onSuccess) {
          props.onSuccess();
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
});

export default compose<ComponentProps>(withTranslation(), connector, formik)(ForgotPasswordForm);

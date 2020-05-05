import * as React from 'react';
import {ComponentClass, FC} from 'react';
import Button from '@material-ui/core/Button';
import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-material-ui';
import {compose} from 'redux';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AuthService from '../../services/auth.service';
import {emailValidator, passwordValidator, usernameValidator} from './_validators';
import {authFormStyles} from './_styles';

const useStyles = authFormStyles;

interface Props {
  toggle: () => void;
}

const mapDispatchToProps = {login};
const connector = connect(null, mapDispatchToProps);

type ComposedProps = Props & FormikProps<any> & ConnectedProps<typeof connector>;

const InnerForm: FC<Props> = ({isValid}: ComposedProps) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="email" label={t('form:email.label')} fullWidth={true} />
      <Field component={TextField} type="text" name="username" label={t('form:username.label')} fullWidth={true} />
      <Field component={TextField} type="password" name="password" label={t('form:password.label')} fullWidth={true} />
      <Button type="submit" variant="contained" color="secondary" fullWidth={true} disabled={!isValid}>
        {t('register.submit')}
      </Button>
    </Form>
  );
};

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const formik = withFormik<ComposedProps, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: '',
  }),

  validationSchema: Yup.object().shape({
    email: emailValidator.check(),
    username: usernameValidator.check(),
    password: passwordValidator,
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<ComposedProps, FormValues>) => {
    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    AuthService.register(data)
      .then(() => {
        props.toggle();
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
});

const composer = compose<ComponentClass<Props>>(connector, formik);
export default composer(InnerForm);

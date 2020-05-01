import Button from '@material-ui/core/Button';
import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-material-ui';
import {createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core';
import {compose} from 'redux';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '../../shared/i18n';
import UserService from '../../services/user.service';
import {AsyncValidator} from '../../utils/yup.helpers';
import AuthService from '../../services/auth.service';
import React = require('react');

interface RegisterFormProps {
  toggle: () => void;
}

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const mapDispatchToProps = {login};
const connector = connect(null, mapDispatchToProps);

const useStyles = (theme: Theme): StyleRules<any> =>
  createStyles({
    root: {
      width: 350,
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  });

type Props = RegisterFormProps &
  FormikProps<FormValues> &
  ConnectedProps<typeof connector> &
  WithStyles<typeof useStyles>;

const InnerForm: FC<RegisterFormProps> = ({isValid, classes}: Props) => {
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

const emailValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:email.required'))
    .email(() => i18n.t('form:email.notValid')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:email.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isEmailUnique(value)) == true,
  }
);

const usernameRegex = /^[A-Za-z\d]+$/;
const usernameValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('form:username.required'))
    .matches(usernameRegex, {message: () => i18n.t('form:username.invalid')})
    .min(5, () => i18n.t('form:username.min5'))
    .max(20, () => i18n.t('form:username.max20')),
  {
    name: 'unique',
    message: (): string => i18n.t('form:username.notUnique'),
    test: async (value): Promise<boolean> => (await UserService.isUsernameUnique(value)) == true,
  }
);

const passwordRegex = /^[A-Za-z\d!@#$%]+$/;
const passwordStrengthRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{0,50})$/;
const passwordValidator = Yup.string()
  .required(() => i18n.t('form:password.required'))
  .matches(passwordRegex, {message: () => i18n.t('form:password.invalid')})
  .matches(passwordStrengthRegex, {message: () => i18n.t('form:password.strength')})
  .min(8, () => i18n.t('form:password.min8'))
  .max(20, () => i18n.t('form:password.max20'));

const formik = withFormik<Props, FormValues>({
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

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
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

const composer = compose<React.ComponentClass<RegisterFormProps>>(connector, formik, withStyles(useStyles));
export default composer(InnerForm);

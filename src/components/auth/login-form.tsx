import Button from '@material-ui/core/Button';
import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {CheckboxWithLabel, TextField} from 'formik-material-ui';
import {Box, createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core';
import {compose} from 'redux';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '../../shared/i18n';
import React = require('react');

interface LoginFormProps {
  toggle: () => void;
}

interface FormValues {
  user: string;
  password: string;
  rememberMe: boolean;
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

type Props = LoginFormProps & FormikProps<FormValues> & ConnectedProps<typeof connector> & WithStyles<typeof useStyles>;

const InnerForm: FC<LoginFormProps> = ({isValid, classes}: Props) => {
  const {t} = useTranslation();

  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="user" label={t('form:user.label')} fullWidth={true} />
      <Field component={TextField} type="password" name="password" label={t('form:password.label')} fullWidth={true} />
      <Box>
        <Field
          component={CheckboxWithLabel}
          type="checkbox"
          name="rememberMe"
          Label={{label: t('form:rememberMe.label')}}
        />
      </Box>
      <Button type="submit" variant="contained" color="secondary" fullWidth={true} disabled={!isValid}>
        {t('login.submit')}
      </Button>
    </Form>
  );
};

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('form:user.required')),
    password: Yup.string().required(() => i18n.t('form:password.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const data = {
      user: values.user,
      password: values.password,
    };
    const successCallback = (): void => {
      props.toggle();
      setSubmitting(false);
    };
    const failureCallback = (): void => {
      setSubmitting(false);
    };
    props.login(data, values.rememberMe, successCallback, failureCallback);
  },
});

const composer = compose<React.ComponentClass<LoginFormProps>>(connector, formik, withStyles(useStyles));
export default composer(InnerForm);

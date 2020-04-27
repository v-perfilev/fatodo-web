import Button from '@material-ui/core/Button';
import { Field, Form, FormikBag, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { Box, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { login } from '../../store/actions/auth.actions';
import { connect, ConnectedProps } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../shared/i18n';
import React = require('react');

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  });

interface FormValues {
  user: string;
  password: string;
  rememberMe: boolean;
}

type Props = FormikProps<FormValues> & ConnectedProps<typeof connector> & WithStyles<typeof styles>;

const InnerForm = ({ isValid, setSubmitting, authState, classes }: Props) => {
  const { t } = useTranslation();
  const { loading } = authState;

  useEffect(() => setSubmitting(loading), [loading]);

  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="user" label={t('auth.user.label')} fullWidth={true} />
      <Field component={TextField} type="password" name="password" label={t('auth.password.label')} fullWidth={true} />
      <Box>
        <Field
          component={CheckboxWithLabel}
          type="checkbox"
          name="rememberMe"
          Label={{ label: t('auth.rememberMe.label') }}
        />
      </Box>
      <Button type="submit" variant="contained" color="secondary" fullWidth={true} disabled={!isValid}>
        {t('auth.submit')}
      </Button>
    </Form>
  );
};

const userRequired = () => i18n.t('auth.user.required');
const passwordRequired = () => i18n.t('auth.password.required');

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(userRequired),
    password: Yup.string().required(passwordRequired),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, formikBag: FormikBag<Props, FormValues>) => {
    formikBag.props.login({ user: values.user, password: values.password }, values.rememberMe);
    formikBag.setSubmitting(false);
  },
});

const mapStateToProps = ({ authState }: IRootState) => ({ authState });
const mapDispatchToProps = { login };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector, withStyles(styles))(formik(InnerForm));

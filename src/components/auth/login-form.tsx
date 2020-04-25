import Button from '@material-ui/core/Button';
import { Field, Form, FormikBag, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { createStyles, LinearProgress, Theme, WithStyles, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import React = require('react');

const styles = (theme: Theme) => createStyles({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
  }
});

type Props = FormikProps<FormValues> & WithStyles<typeof styles>;

const InnerForm = ({ classes, isValid, isSubmitting }: Props) => {
  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="email" label="Email" fullWidth/>
      <Field component={TextField} type="password" name="password" label="Password" fullWidth/>
      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!isValid}>
        Submit
      </Button>
      {isSubmitting && <LinearProgress/>}
    </Form>
  );
};

interface FormValues {
  email: string;
  password: string;
}

interface FormProps {
  login: Function
}

const formik = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().required('Password is required')
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, { setSubmitting, props: { login } }: FormikBag<FormProps, FormValues>) => {
    login(values);
    setSubmitting(false);
  }
});

export default compose(
  formik,
  withStyles(styles)
)(InnerForm);

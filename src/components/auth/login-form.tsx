import Button from '@material-ui/core/Button';
import { Field, Form, FormikBag, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { createStyles, LinearProgress, Theme, WithStyles, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import React = require('react');
import { AuthenticationState } from '../../redux/rerducers/auth-reduser';

interface FormProps {
  initial: FormValues,
  login: Function
}

export interface FormValues {
  email: string;
  password: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
  }
});
type StylesProps = WithStyles<typeof styles>;

const InnerForm = (props: FormikProps<FormValues>&StylesProps) => {
  const {classes, isValid, isSubmitting} = props;
  return (
    <Form className={classes.root}>
      <Field
        component={TextField}
        type="text"
        name="email"
        label="Email"
        fullWidth
      />
      <Field
        component={TextField}
        type="password"
        name="password"
        label="Password"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={!isValid}
      >
        Submit
      </Button>
      {isSubmitting && <LinearProgress/>}
    </Form>
  );
};

export default compose(
  withFormik<FormProps, FormValues>({
    mapPropsToValues: props => ( {
      email: props.initial.email,
      password: props.initial.password
    } ),

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email not valid').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),

    validateOnMount: true,

    handleSubmit: (values: FormValues, props: FormikBag<FormProps, FormValues>) => {
      const {login} = props.props;
      login(values);
      props.setSubmitting(false);
    }
  }),
  withStyles(styles)
)(InnerForm);

import Button from '@material-ui/core/Button';
import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {CheckboxWithLabel, TextField} from 'formik-material-ui';
import {Box, IconButton, InputAdornment} from '@material-ui/core';
import {compose} from 'redux';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import * as React from 'react';
import {FC, useState} from 'react';
import i18n from '../../shared/i18n';
import {authStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const useStyles = authStyles;

interface Props {
  onSuccess?: () => void;
}

const mapDispatchToProps = {login};
const connector = connect(null, mapDispatchToProps);

type ComposedProps = Props & FormikProps<any> & ConnectedProps<typeof connector>;

const InnerForm: FC<Props> = ({isValid}: ComposedProps) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prevState => !prevState));
  const handleMouseDownPassword = (event): void => event.preventDefault();

  return (
    <Form className={classes.root}>
      <Field component={TextField} type="text" name="user" label={t('form:user.label')} fullWidth={true} />
      <Field
        component={TextField}
        type={showPassword ? 'text' : 'password'}
        name="password"
        label={t('form:password.label')}
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleShowPassword}
                onMouseDown={handleMouseDownPassword}
                size={'small'}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }} />
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

interface FormValues {
  user: string;
  password: string;
  rememberMe: boolean;
}

const formik = withFormik<ComposedProps, FormValues>({
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

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<ComposedProps, FormValues>) => {
    const data = {
      user: values.user,
      password: values.password,
    };
    const onSuccess = (): void => {
      if (props.onSuccess) {
        props.onSuccess();
      }
      setSubmitting(false);
    };
    const onFailure = (): void => {
      setSubmitting(false);
    };
    props.login(data, values.rememberMe, onSuccess, onFailure);
  },
});

const composer = compose<React.ComponentClass<Props>>(connector, formik);
export default composer(InnerForm);

import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {LoadingButton} from '../../controls';
import {MultilineInput, TextInput} from '../../inputs';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import i18n from '../../../../shared/i18n';
import {compose} from 'recompose';
import {ContactRequestFormValues, defaultContactRequestFormValues} from './_form';
import UserService from '../../../../services/user.service';
import {RootState} from '../../../../store';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {contactRequestDialogStyles} from './_styles';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> &
  FormikProps<ContactRequestFormValues> & {
  show: boolean;
  setShow: (show: boolean) => void;
};

const ContactRequestDialog: FC<Props> = ({show, setShow, ...props}: Props) => {
  const classes = contactRequestDialogStyles();
  const {values, setFieldValue, isValid, isSubmitting, validateForm, setErrors, resetForm} = props;
  const {t} = useTranslation();

  const close = (): void => {
    setShow(false);
    resetForm();
    validateForm().then((errors) => setErrors(errors));
  };

  useEffect(() => {
    if (values.user) {
      setFieldValue('userId', '');
      UserService.getByUserNameOrEmail(values.user)
        .then((response) => {
          setFieldValue('userId', response.data.id);
        })
        .catch(() => {
          // skip
        });
    }
  }, [values.user]);

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {t('contact:addContact.cancel')}
    </Button>
  );

  const sendButton = (
    <LoadingButton type="submit" color="secondary" disabled={isSubmitting || !isValid} loading={isSubmitting}>
      {t('contact:addContact.send')}
    </LoadingButton>
  );

  return (
    <Dialog open={show} onClose={close}>
      <Form>
        <DialogTitle className={classes.title}>{t('contact:addContact.title')}</DialogTitle>
        <DialogContent className={classes.content}>
          <TextInput name="user" label={t('contact:addContact.fields.user.label')} required />
          <MultilineInput name="message" label={t('contact:addContact.fields.message.label')} rows={4} />
        </DialogContent>
        <DialogActions>
          {cancelButton}
          {sendButton}
        </DialogActions>
      </Form>
    </Dialog>
  );
};

const formik = withFormik<Props, ContactRequestFormValues>({
  mapPropsToValues: () => defaultContactRequestFormValues,

  validationSchema: ({authState: {account}}: Props) =>
    Yup.object().shape({
      user: Yup.string()
        .required(() => i18n.t('contact:addContact.fields.user.required'))
        .test(
          'currentUser',
          () => i18n.t('contact:addContact.fields.user.current'),
          (value) => value !== account.username && value !== account.email
        )
        .when('userId', {
          is: (val) => !val,
          then: Yup.string().test(
            'userNotExist',
            () => i18n.t('contact:addContact.fields.user.notRegistered'),
            () => false
          )
        }),
      userId: Yup.string().required()
    }),

  validateOnMount: true,

  handleSubmit: (values: ContactRequestFormValues, {setSubmitting}: FormikBag<Props, ContactRequestFormValues>) => {
    console.log('!');
  }
});

export default compose(connector, formik)(ContactRequestDialog);

import React, {FC} from 'react';
import {itemFormStyles} from './_styles';
import {Item} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import {Container} from '@material-ui/core';
import PageHeader from '../../common/page-layouts/page-header';
import PageDivider from '../../common/page-layouts/page-divider';
import {Field, Form, FormikBag, withFormik} from 'formik';
import {TextField} from 'formik-material-ui';
import * as Yup from 'yup';
import {emailValidator, passwordValidator, usernameValidator} from '../../account/_validators';
import {compose} from 'recompose';

type Props = {
  item: Item;
  headerTitle: string;
}

const ItemForm: FC<Props> = ({item, headerTitle}: Props) => {
  const classes = itemFormStyles();
  const {t} = useTranslation();

  return (
    <Container className={classes.root}>
      <PageHeader title={headerTitle} />
      <PageDivider color={item.group.color} height={5} />
      <Form className={classes.form}>
        <Field component={TextField} type="text" name="email" label={t('form:fields.email.label')} fullWidth={true} />
      </Form>
    </Container>
  );
};

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: '',
  }),

  mapPropsToErrors: () => ({
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

  },
});

export default compose(formik)(ItemForm);

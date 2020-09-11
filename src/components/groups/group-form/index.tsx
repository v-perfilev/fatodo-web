import React, {FC} from 'react';
import {groupFormStyles} from './_styles';
import {Container, Grid} from '@material-ui/core';
import PageHeader from '../../common/page-layouts/page-header';
import PageDivider from '../../common/page-layouts/page-divider';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {Group} from '../../../models/group';
import {GradientColor} from '../../_types';

type Props = FormikProps<any> & {
  group: Group;
  header: string;
};

const ItemForm: FC<Props> = ({group, header, values, ...props}: Props) => {
  const classes = groupFormStyles();

  const color = values.color;

  return (
    <Container className={classes.root}>
      <PageHeader title={header} />
      <PageDivider color={color} height={5} />
      <Form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Test
          </Grid>
          <Grid item xs={6} lg={3}>
            Test
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

interface FormValues {
  title: string;
  color: GradientColor;
}

export const defaultFormValues: Readonly<FormValues> = {
  title: '',
  color: 'yellow' as GradientColor,
};

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => defaultFormValues,

  validateOnMount: true,

  handleSubmit: (values: FormValues, {}: FormikBag<Props, FormValues>) => {
    console.log(values);
  },
});

export default compose(formik)(ItemForm);

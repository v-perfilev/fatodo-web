import React, {FC, useState} from 'react';
import {groupFormStyles} from './_styles';
import {Container, Grid} from '@material-ui/core';
import PageHeader from '../../common/layout-page/page-header';
import PageDivider from '../../common/layout-page/page-divider';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import {GradientColor} from '../../../shared/utils/color.utils';
import ImageUploader from '../../common/inputs/image-uploader';
import {Image} from '../../../models/image.model';
import GroupFormTitle from './group-form-title';
import GroupFormColor from './group-form-color';

type Props = FormikProps<any> & {
  group: Group;
  header: string;
};

const GroupForm: FC<Props> = ({group, header, values, ...props}: Props) => {
  const classes = groupFormStyles();
  const [image, setImage] = useState<Image>(null);

  const color = values.color;

  return (
    <Container className={classes.root}>
      <PageHeader title={header} />
      <PageDivider color={color} height={5} />
      <Form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GroupFormTitle />
          </Grid>
          <Grid item xs={6} lg={3}>
            <GroupFormColor />
          </Grid>
          <Grid item xs={6} lg={9} />
          <Grid item xs={6} lg={3}>
            <ImageUploader image={image} setImage={setImage} />
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

export default compose(formik)(GroupForm);

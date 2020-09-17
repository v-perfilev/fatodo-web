import React, {FC, useEffect, useRef} from 'react';
import {groupFormStyles} from './_styles';
import {Button, Container, Grid} from '@material-ui/core';
import PageHeader from '../../common/layout-page/page-header';
import PageDivider from '../../common/layout-page/page-divider';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import {GradientColor} from '../../../shared/utils/color.utils';
import GroupFormColor from './group-form-color';
import GroupFormImage from './group-form-image';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import GroupFormTitle from './group-form-title';
import {FormUtils} from '../../../shared/utils/form.utils';

type Props = FormikProps<any> & {
  group?: Group;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (data: FormData, stopSubmitting: () => void) => void;
};

const GroupForm: FC<Props> = ({header, setSaveCallback, isValid, isSubmitting, ...props}: Props) => {
  const classes = groupFormStyles();
  const color = props.values.color;
  const buttonRef = useRef<HTMLButtonElement>();

  const saveCallback = (): void => {
    if (isValid) {
      buttonRef.current.click();
    } else {
      props.submitForm().catch(() => {
        // skip
      });
    }
  };

  useEffect(() => {
    setSaveCallback(() => saveCallback);
  }, [isValid]);

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
            <GroupFormImage {...props} />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

interface FormValues {
  id: string;
  title: string;
  color: GradientColor;
  imageFilename?: string;
  imageContent?: Blob;
}

export const defaultValues: Readonly<FormValues> = {
  id: null,
  title: '',
  color: 'yellow',
  imageFilename: null,
  imageContent: null,
};

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: ({group}: Props) => group ?? defaultValues,

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('account:fields.user.required')),
    color: Yup.string().required(() => i18n.t('account:fields.user.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {request} = props;
    const data = FormUtils.toFormData(values);
    request(data, () => setSubmitting(false));
  },
});

export default compose(formik)(GroupForm);

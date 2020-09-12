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
import {Image} from '../../../models/image.model';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import GroupFormTitle from './group-form-title';

type Props = FormikProps<any> & {
  group?: Group;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  onSuccess: () => void;
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
  }, [isValid, props.values]);

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
  title: string;
  color: GradientColor;
  image: Image;
}

export const defaultValues: Readonly<FormValues> = {
  title: '',
  color: 'yellow',
  image: null,
};

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: ({group}: Props) => (group ? {
    title: group.title ?? defaultValues.title,
    color: group.color ?? defaultValues.color,
    image: group.imageUrl ? {url: group.imageUrl} : defaultValues.image,
  } : defaultValues),

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('account:fields.user.required')),
    color: Yup.string().required(() => i18n.t('account:fields.user.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {onSuccess} = props;
    console.log('handle submit');
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },
});

export default compose(formik)(GroupForm);

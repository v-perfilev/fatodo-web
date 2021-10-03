import React, {FC, useEffect, useRef} from 'react';
import {groupFormStyles} from './_styles';
import {Button, Grid} from '@material-ui/core';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {Group} from '../../../models/group.model';
import {GroupFormUtils, GroupFormValues} from './_form';
import {ImageUpload, TextInput, ThemeSelect} from '../../../components/inputs';
import {useTranslation} from 'react-i18next';
import {PageDivider, PageHeader} from '../../../components/surfaces';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {flowRight} from 'lodash';

type BaseProps = {
  group?: Group;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (formData: FormData, stopSubmitting: () => void) => void;
};

type Props = FormikProps<GroupFormValues> & BaseProps;

const GroupForm: FC<Props> = ({header, setSaveCallback, isValid, submitForm, isSubmitting}: Props) => {
  const classes = groupFormStyles();
  const {t} = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    setSaveCallback(() => (): void | Promise<void> => (isValid ? buttonRef.current.click() : submitForm()));
  }, [isValid]);

  return (
    <>
      <PageHeader title={header} />
      <PageDivider height={5} />
      <Form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInput name="title" label={t('group:fields.title.label')} required />
          </Grid>
          <Grid item xs={6} lg={3}>
            <ThemeSelect name="color" label={t('group:fields.color.label')} />
          </Grid>
          <Grid item xs={6} lg={9} />
          <Grid item xs={6} lg={3}>
            <ImageUpload
              filenameName="imageFilename"
              contentName="imageContent"
              label={t('group:fields.image.label')}
              preview
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
          Submit
        </Button>
      </Form>
    </>
  );
};

const formik = withFormik<Props, GroupFormValues>({
  mapPropsToValues: ({group}: Props) => GroupFormUtils.mapPropsToValues(group),
  validationSchema: GroupFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: GroupFormValues, {setSubmitting, props}: FormikBag<Props, GroupFormValues>) => {
    const {request, group} = props;
    const formData = GroupFormUtils.mapValuesToFormData(values, group);
    request(formData, () => setSubmitting(false));
  },
});

export default flowRight([formik, withVerticalPadding])(GroupForm);

import React, {FC, useEffect, useRef} from 'react';
import {groupFormStyles} from './_styles';
import {Button, Container, Grid, ThemeProvider} from '@material-ui/core';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import {GroupFormUtils, GroupFormValues} from './_form';
import {ThemeFactory} from '../../../shared/theme/theme';
import {GroupDTO} from '../../../models/dto/group.dto';
import {ImageUpload} from '../../common/inputs/image-upload';
import {useTranslation} from 'react-i18next';
import {ThemeSelect} from '../../common/inputs/theme-select';
import {PageHeader} from '../../common/layouts/page-header';
import {PageDivider} from '../../common/layouts/page-divider';
import {TextInput} from '../../common/inputs/text-input';

type Props = FormikProps<any> & {
  group?: Group;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (groupDTO: GroupDTO, stopSubmitting: () => void) => void;
};

const GroupForm: FC<Props> = (props: Props) => {
  const classes = groupFormStyles();
  const {t} = useTranslation();
  const {header, setSaveCallback, values, isValid, submitForm, isSubmitting} = props;
  const buttonRef = useRef<HTMLButtonElement>();

  const color = values.color;

  useEffect(() => {
    if (isValid) {
      setSaveCallback(() => (): void => buttonRef.current.click());
    } else {
      setSaveCallback(() => (): Promise<void> => submitForm());
    }
  }, [isValid]);

  const theme = ThemeFactory.getTheme(color);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <PageHeader title={header} />
        <PageDivider height={5} />
        <Form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput name="title" label={t('groups:fields.title.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <ThemeSelect name="color" label={t('groups:fields.color.label')} />
            </Grid>
            <Grid item xs={6} lg={9} />
            <Grid item xs={6} lg={3}>
              <ImageUpload
                filenameName="imageFilename"
                contentName="imageContent"
                label={t('groups:fields.image.label')}
                preview
              />
            </Grid>
          </Grid>
          <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
            Submit
          </Button>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

const formik = withFormik<Props, GroupFormValues>({
  mapPropsToValues: ({group}: Props) => GroupFormUtils.mapGroupToValues(group),

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('groups:fields.title.required')),
    color: Yup.string().required(() => i18n.t('groups:fields.color.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: GroupFormValues, {setSubmitting, props}: FormikBag<Props, GroupFormValues>) => {
    const {request, group} = props;
    const data = GroupFormUtils.mapValuesToDTO(values, group);
    request(data, () => setSubmitting(false));
  },
});

export default compose(formik)(GroupForm);

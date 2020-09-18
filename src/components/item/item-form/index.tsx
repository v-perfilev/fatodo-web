import React, {FC, useEffect, useRef} from 'react';
import {itemFormStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Button, Container, Grid} from '@material-ui/core';
import PageHeader from '../../common/layout-page/page-header';
import PageDivider from '../../common/layout-page/page-divider';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import ItemFormTitle from './item-form-title';
import ItemFormType from './item-form-type';
import ItemFormPriority from './item-form-priority';
import ItemFormTime from './item-form-time';
import ItemFormDate from './item-form-date';
import ItemFormDescription from './item-form-description';
import ItemFormTags from './item-form-tags';
import ItemFormReminders from './item-form-reminders';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import {ItemFormUtils, ItemFormValues} from './_form';
import {Group} from '../../../models/group.model';

type Props = FormikProps<any> & {
  group: Group;
  item?: Item;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (data: FormData, stopSubmitting: () => void) => void;
};

const ItemForm: FC<Props> = (props: Props) => {
  const classes = itemFormStyles();
  const {group, header, setSaveCallback, isValid, submitForm, isSubmitting} = props;
  const color = group.color;
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (isValid) {
      setSaveCallback(() => () => buttonRef.current.click());
    } else {
      setSaveCallback(() => () => submitForm());
    }
  }, [isValid]);

  return (
    <Container className={classes.root}>
      <PageHeader title={header} />
      <PageDivider color={color} height={5} />
      <Form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ItemFormTitle />
          </Grid>
          <Grid item xs={6} lg={3}>
            <ItemFormType />
          </Grid>
          <Grid item xs={6} lg={3}>
            <ItemFormPriority />
          </Grid>
          <Grid item xs={6} lg={3}>
            <ItemFormTime {...props} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <ItemFormDate {...props} />
          </Grid>
          <Grid item xs={12}>
            <ItemFormDescription />
          </Grid>
          <Grid item xs={12}>
            <ItemFormReminders {...props} />
          </Grid>
          <Grid item xs={12}>
            <ItemFormTags />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const formik = withFormik<Props, ItemFormValues>({
  mapPropsToValues: ({item}: Props) => ItemFormUtils.mapItemToValues(item),

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('account:fields.user.required')),
    type: Yup.string().required(() => i18n.t('account:fields.user.required')),
    priority: Yup.string().required(() => i18n.t('account:fields.user.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: ItemFormValues, {setSubmitting, props}: FormikBag<Props, ItemFormValues>) => {
    const {request, item} = props;
    const data = ItemFormUtils.mapValuesToFormData(values, item);
    request(data, () => setSubmitting(false));
  },
});

export default compose(formik)(ItemForm);

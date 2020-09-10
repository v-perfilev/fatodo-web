import React, {FC} from 'react';
import {itemFormStyles} from './_styles';
import {Item, itemPriorities, ItemPriority, ItemType, itemTypes} from '../../../models/item';
import {Container, Grid} from '@material-ui/core';
import PageHeader from '../../common/page-layouts/page-header';
import PageDivider from '../../common/page-layouts/page-divider';
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
import {Reminder} from '../../../models/reminder';
import {TEST_REMINDER} from '../../_constants';

type Props = FormikProps<any> & {
  item: Item;
  headerPrefix: string;
};

const ItemForm: FC<Props> = ({item, headerPrefix, ...props}: Props) => {
  const classes = itemFormStyles();

  const headerTitle = headerPrefix + item.group.title;

  return (
    <Container className={classes.root}>
      <PageHeader title={headerTitle} />
      <PageDivider color={item.group.color} height={5} />
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
      </Form>
    </Container>
  );
};

interface FormValues {
  title: string;
  type: ItemType;
  priority: ItemPriority;
  time?: Date;
  date?: Date;
  description?: string;
  reminders?: Reminder[];
  tags?: string[];
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    title: '',
    type: itemTypes[0],
    priority: itemPriorities[1],
    time: null,
    date: null,
    description: '',
    reminders: [TEST_REMINDER],
    tags: [],
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {}: FormikBag<Props, FormValues>) => {
    console.log(values);
  },
});

export default compose(formik)(ItemForm);

import React, {FC} from 'react';
import {itemFormStyles} from './_styles';
import {Item, itemPriorities, ItemPriority, ItemType, itemTypes} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import {Container, Grid, MenuItem} from '@material-ui/core';
import PageHeader from '../../common/page-layouts/page-header';
import PageDivider from '../../common/page-layouts/page-divider';
import {Field, Form, FormikBag, withFormik} from 'formik';
import {TextField} from 'formik-material-ui';
import {compose} from 'recompose';
import {DatePicker, TimePicker} from 'formik-material-ui-pickers';
import {DateUtils} from '../../../shared/utils/date.utils';

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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={6}>
            <Field component={TextField} type="text" name="title" label={t('items:fields.title.label')} required
                   fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Field component={TextField} type="text" name="type" label={t('items:fields.type.label')} select required
                   fullWidth>
              {Object.values(itemTypes).map((type, index) => (
                <MenuItem value={type} key={index}>{t('items:types.' + type)}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Field component={TextField} type="text" name="priority" label={t('items:fields.priority.label')} select
                   required
                   fullWidth>
              {Object.values(itemPriorities).map((priority, index) => (
                <MenuItem value={priority} key={index}>{t('items:priorities.' + priority)}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={6} sm={6} lg={3}>
            <Field component={TimePicker} ampm={false} type="text" name="time" label={t('items:fields.time.label')}
                   format={DateUtils.getTimeFormat()} variant="inline" fullWidth />
          </Grid>
          <Grid item xs={6} sm={6} lg={3}>
            <Field component={DatePicker} ampm={false} type="text" name="date" label={t('items:fields.date.label')}
                   format={DateUtils.getDateWithYearFormat()} variant="inline" fullWidth />
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
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    title: '',
    type: itemTypes[0],
    priority: itemPriorities[1],
    time: new Date(),
    date: new Date(),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {

  },
});

export default compose(formik)(ItemForm);

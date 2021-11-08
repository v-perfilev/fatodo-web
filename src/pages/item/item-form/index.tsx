import React, {FC, useEffect, useRef} from 'react';
import {itemFormStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Button, Grid} from '@material-ui/core';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {ItemFormUtils, ItemFormValues} from './_form';
import {Group} from '../../../models/group.model';
import {ItemDTO} from '../../../models/dto/item.dto';
import {PageDivider, PageHeader} from '../../../components/surfaces';
import {
  DateInput,
  MultilineInput,
  PriorityInput,
  RemindersInput,
  TagsInput,
  TextInput,
  TimeInput,
} from '../../../components/inputs';
import {useTranslation} from 'react-i18next';
import TypeInput from '../../../components/inputs/type-input';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {flowRight} from 'lodash';
import {Reminder} from '../../../models/reminder.model';

type BaseProps = {
  group: Group;
  item?: Item;
  reminders?: Reminder[];
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (data: ItemDTO, stopSubmitting: () => void) => void;
};

type Props = FormikProps<ItemFormValues> & BaseProps;

const ItemForm: FC<Props> = (props: Props) => {
  const classes = itemFormStyles();
  const {t} = useTranslation();
  const {header, setSaveCallback, isValid, submitForm, isSubmitting} = props;
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
            <TextInput name="title" label={t('item:fields.title.label')} required />
          </Grid>
          <Grid item xs={6} lg={3}>
            <TypeInput name="type" label={t('item:fields.type.label')} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <PriorityInput name="priority" label={t('item:fields.priority.label')} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <TimeInput name="time" label={t('item:fields.time.label')} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <DateInput name="date" label={t('item:fields.date.label')} />
          </Grid>
          <Grid item xs={12}>
            <MultilineInput name="description" label={t('item:fields.description.label')} />
          </Grid>
          <Grid item xs={12}>
            <RemindersInput name="reminders" label={t('item:fields.reminders.label')} />
          </Grid>
          <Grid item xs={12}>
            <TagsInput name="tags" label={t('item:fields.tags.label')} />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
          Submit
        </Button>
      </Form>
    </>
  );
};

const formik = withFormik<Props, ItemFormValues>({
  mapPropsToValues: ({item, reminders}: Props) => ItemFormUtils.mapPropsToValues(item, reminders),
  validationSchema: ItemFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: ItemFormValues, {setSubmitting, props}: FormikBag<Props, ItemFormValues>) => {
    const {request, item, group, reminders} = props;
    const dto = ItemFormUtils.mapValuesToDTO(values, item, group, reminders);
    request(dto, () => setSubmitting(false));
  },
});

export default flowRight([formik, withVerticalPadding])(ItemForm);

import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {Item} from '../../../models/Item';
import {Reminder} from '../../../models/Reminder';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikPrioritySelect from '../../../components/inputs/FormikPrioritySelect';
import FormikRemindersInput from '../../../components/inputs/formikRemindersInput/FormikRemindersInput';
import FormikStatusInput from '../../../components/inputs/FormikStatusInput';

export interface ItemFormValues {
  title: string;
  priority: number;
  description?: string;
  reminders?: Reminder[];
  done: boolean;
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  priority: 2,
  description: '',
  reminders: [],
  done: false,
};

const initialValues = (item: Item, reminders: Reminder[]): ItemFormValues =>
  item
    ? {
        title: item.title,
        priority: item.priority,
        description: item.description,
        reminders: reminders,
        done: item.done,
      }
    : defaultItemFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('item:fields.title.required')),
  priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
});

type ItemFormProps = {
  group: Group;
  item?: Item;
  reminders?: Reminder[];
  request: (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ItemForm = ({group, item, reminders, request, cancel}: ItemFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ItemFormValues, helpers: FormikHelpers<ItemFormValues>): void => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;

    const dto: ItemDTO = {
      id: item ? item.id : null,
      title: values.title,
      priority: values.priority,
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      groupId: group.id,
      done: values.done,
      deleteReminders: deleteReminders ? true : undefined,
    };

    request(dto, values.reminders, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(item, reminders)}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          {item && <FormikStatusInput name="done" />}

          <FormikPrioritySelect
            name="priority"
            label={t('item:fields.priority.label')}
            disabled={formikProps.isSubmitting}
          />

          <FormikTextInput name="title" label={t('item:fields.title.label')} disabled={formikProps.isSubmitting} />

          <FormikTextInput
            name="description"
            label={t('item:fields.description.label')}
            rows={10}
            disabled={formikProps.isSubmitting}
          />

          <FormikRemindersInput name="reminders" label={t('item:fields.reminders.label')} />

          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('item:actions.cancel')}
            </Button>
            <LoadingButton
              variant="text"
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('item:actions.save')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ItemForm;

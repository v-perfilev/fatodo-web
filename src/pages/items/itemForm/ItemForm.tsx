import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {
  Item,
  ItemPriorityType,
  itemPriorityTypes,
  ItemStatusType,
  itemStatusTypes,
  ItemType,
  itemTypes,
} from '../../../models/Item';
import {Reminder} from '../../../models/Reminder';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {UserAccount} from '../../../models/User';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikStatusSelect from '../../../components/inputs/FormikStatusSelect';
import FormikTypeSelect from '../../../components/inputs/FormikTypeSelect';
import FormikPrioritySelect from '../../../components/inputs/FormikPrioritySelect';
import FormikDateInput from '../../../components/inputs/FormikDateInput';
import FormikRemindersInput from '../../../components/inputs/formikRemindersInput/FormikRemindersInput';

export interface ItemFormValues {
  title: string;
  status: ItemStatusType;
  type: ItemType;
  priority: ItemPriorityType;
  time?: Date;
  date?: Date;
  description?: string;
  reminders?: Reminder[];
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  status: itemStatusTypes[0],
  type: itemTypes[0],
  priority: itemPriorityTypes[1],
  time: null,
  date: null,
  description: '',
  reminders: [],
};

const initialValues = (item: Item, reminders: Reminder[], account: UserAccount): ItemFormValues =>
  item
    ? {
        title: item.title,
        status: item.status,
        type: item.type,
        priority: item.priority,
        time: DateConverters.getTimeFromParamDate(item.date, account.info.timezone),
        date: DateConverters.getDateFromParamDate(item.date, account.info.timezone),
        description: item.description,
        reminders: reminders,
      }
    : defaultItemFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('item:fields.title.required')),
  status: Yup.string().required(() => i18n.t('item:fields.type.required')),
  type: Yup.string().required(() => i18n.t('item:fields.type.required')),
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
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const handleSubmit = (values: ItemFormValues, helpers: FormikHelpers<ItemFormValues>): void => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;

    const dto: ItemDTO = {
      id: item ? item.id : null,
      title: values.title,
      status: values.status,
      type: values.type,
      priority: values.priority,
      date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date, account.info.timezone),
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      groupId: group.id,
      deleteReminders: deleteReminders ? true : undefined,
    };

    request(dto, values.reminders, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(item, reminders, account)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput name="title" label={t('item:fields.title.label')} disabled={formikProps.isSubmitting} />
          <FormikStatusSelect name="status" label={t('item:fields.status.label')} disabled={formikProps.isSubmitting} />
          <FHStack>
            <FHStack flexBasis={1}>
              <FormikTypeSelect name="type" label={t('item:fields.type.label')} dDisabled={formikProps.isSubmitting} />
            </FHStack>
            <FHStack flexBasis={1}>
              <FormikPrioritySelect
                name="priority"
                label={t('item:fields.priority.label')}
                disabled={formikProps.isSubmitting}
              />
            </FHStack>
          </FHStack>
          <FHStack>
            <FHStack flexBasis={1}>
              <FormikDateInput
                mode="time"
                name="time"
                label={t('item:fields.time.label')}
                disabled={formikProps.isSubmitting}
              />
            </FHStack>
            <FHStack flexBasis={1}>
              <FormikDateInput
                mode="date"
                name="date"
                label={t('item:fields.date.label')}
                disabled={formikProps.isSubmitting}
              />
            </FHStack>
          </FHStack>
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

import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Reminder} from '../../../models/reminder';
import RemindersInput from '../../common/inputs/reminders-input';

type Props = {
  values: any;
  setFieldValue: (field: string, value: Reminder[]) => void;
};

const ItemFormReminders: FC<Props> = ({values, setFieldValue}: Props) => {
  const {t} = useTranslation();

  return (
    <RemindersInput
      label={t('items:fields.reminders.label')}
      name="reminders"
      values={values}
      setFieldValue={setFieldValue}
    />
  );
};

export default ItemFormReminders;

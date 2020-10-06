import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Reminder} from '../../../models/reminder.model';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../common/layouts/labeled-box';
import {ReminderView} from '../../common/views/reminder-view';

type Props = HTMLAttributes<any> & {
  reminders: Reminder[];
};

const ItemViewReminders: FC<Props> = ({reminders, className}: Props) => {
  const {t} = useTranslation();

  const showReminders = reminders && reminders.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('items:labels.reminders')} className={className}>
        {reminders.map((reminder, index) => (
          <Chip key={index} size="medium" label={<ReminderView reminder={reminder} />} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewReminders;

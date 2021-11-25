import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../../components/surfaces';
import {itemViewCommonStyles} from './_styles';
import {useReminderListContext} from '../../../shared/contexts/list-contexts/reminder-list-context';
import ReminderView from '../../../components/views/reminder-view';

const ItemViewReminders: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {objs: reminders} = useReminderListContext();

  const showReminders = reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('item:labels.reminders')}>
        {reminders.map((reminder) => (
          <Chip
            key={reminder.id}
            size="medium"
            label={<ReminderView reminder={reminder} />}
            className={commonClasses.box}
          />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewReminders;

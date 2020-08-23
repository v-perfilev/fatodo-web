import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {Reminder} from '../../../models/reminder';
import {TimeUtils} from '../../../shared/utils/time.utils';

type Props = HTMLAttributes<any> & {
  reminder: Reminder;
}

const ReminderView: FC<Props> = ({reminder, className}: Props) => {
  const {t} = useTranslation();

  const label = t('items:reminder.periodicity.' + reminder.periodicity) + ': ';

  const timeDate = TimeUtils.getTimeFromParamDate(reminder.date);
  const dateDate = TimeUtils.getDateFromParamDate(reminder.date);

  const time = TimeUtils.formatTime(timeDate);

  let description = '';
  if (reminder.periodicity === 'once') {
    const date = TimeUtils.formatDateWithYear(dateDate);
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  } else if (reminder.periodicity === 'daily') {
    description = t('items:reminder.' + reminder.periodicity, {time});
  } else if (reminder.periodicity === 'weekly') {
    const weekdays = reminder.weekDays.join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, weekdays});
  } else if (reminder.periodicity === 'monthly') {
    const days = reminder.monthDays.map(d => t('items:reminder.weekdays.' + d)).join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, days});
  } else if (reminder.periodicity === 'yearly') {
    const date = TimeUtils.formatDate(dateDate);
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  }

  const reminderStr = label + description;
  return <Box className={className}>{reminderStr}</Box>;
};

export default ReminderView;

import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../models/reminder.model';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../models/date-params.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {TimeSelectInput} from '../time-select-input';
import {DateSelect} from '../date-select';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

export const RemindersInputPopoverOnce: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && date) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, date);
      setReminder({date: paramDate, periodicity: 'ONCE'});
    }
  }, [time, date]);

  return (
    <Box className={classes.root}>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DateSelect label={t('common:reminders.fields.date')} required date={date} setDate={setDate} />
    </Box>
  );
};
import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder.model';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ParamDate} from '../../../../models/param-date.model';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {TimeSelect} from '../time-select';
import {DateSelect} from '../date-select';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

export const RemindersInputPopoverYearly: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && date) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTimeAndDateWithoutYear(time, date);
      setReminder({date: paramDate, periodicity: 'yearly'});
    }
  }, [time, date]);

  return (
    <Box className={classes.root}>
      <TimeSelect label={t('items:fields.time.label')} required time={time} setTime={setTime} />
      <DateSelect label={t('items:fields.date.label')} required date={date} setDate={setDate} firstInputType="month" />
    </Box>
  );
};

import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input';
import DateInput from '../date-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ParamDate} from '../../../../models/param-date';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverOnce: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && date) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTimeAndDate(time, date);
      setReminder({date: paramDate, periodicity: 'once'});
    }
  }, [time, date]);

  return (
    <Box className={classes.root}>
      <TimeInput label={t('items:fields.time.label')} required time={time} setTime={setTime} />
      <DateInput label={t('items:fields.date.label')} required date={date} setDate={setDate} />
    </Box>
  );
};

export default RemindersInputPopoverOnce;

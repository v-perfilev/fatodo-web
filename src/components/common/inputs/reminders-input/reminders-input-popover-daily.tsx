import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder.model';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ParamDate} from '../../../../models/param-date.model';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {TimeSelect} from '../time-select';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

export const RemindersInputPopoverDaily: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, periodicity: 'DAILY'});
    }
  }, [time]);

  return (
    <Box className={classes.root}>
      <TimeSelect label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
    </Box>
  );
};

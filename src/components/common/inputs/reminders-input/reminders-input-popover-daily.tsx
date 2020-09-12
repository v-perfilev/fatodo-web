import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder.model';
import TimeInput from '../time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ParamDate} from '../../../../models/param-date.model';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverDaily: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, periodicity: 'daily'});
    }
  }, [time]);

  return (
    <Box className={classes.root}>
      <TimeInput label={t('items:fields.time.label')} required time={time} setTime={setTime} />
    </Box>
  );
};

export default RemindersInputPopoverDaily;

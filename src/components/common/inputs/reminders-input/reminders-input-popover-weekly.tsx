import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import DaysSelect from '../days-select/days-select';
import {ParamDate} from '../../../../models/param-date';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverWeekly: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && days && days.length > 0) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, weekDays: days, periodicity: 'weekly'});
    }
  }, [time, days]);

  const handleClick = (day: number): void => {
    setDays((prevState) => {
      if (prevState.includes(day)) {
        prevState.splice(prevState.indexOf(day), 1);
      } else {
        prevState.push(day);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeInput label={t('items:fields.time.label')} required time={time} setTime={setTime} />
      <DaysSelect label={t('items:fields.weekdays.label')} required selectedDays={days} handleClick={handleClick} />
    </Box>
  );
};

export default RemindersInputPopoverWeekly;

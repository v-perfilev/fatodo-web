import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder.model';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../../models/date-params.model';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {TimeSelect} from '../time-select';
import {DaysSelect} from '../days-select';
import {ArrayUtils} from '../../../../shared/utils/array.utils';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

export const RemindersInputPopoverWeekly: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && days && days.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, weekDays: days, periodicity: 'WEEKLY'});
    }
  }, [time, days]);

  const handleClick = (day: number): void => {
    setDays((prevState) => {
      if (prevState.includes(day)) {
        ArrayUtils.deleteItem(prevState, day);
      } else {
        prevState.push(day);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeSelect label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DaysSelect
        label={t('common:reminders.fields.weekdays')}
        required
        selectedDays={days}
        handleClick={handleClick}
      />
    </Box>
  );
};

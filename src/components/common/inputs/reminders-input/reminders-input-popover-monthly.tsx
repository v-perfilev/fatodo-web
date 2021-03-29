import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder.model';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../../models/date-params.model';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {TimeSelect} from '../time-select';
import {CalendarSelect} from '../calendar-select';
import {ArrayUtils} from '../../../../shared/utils/array.utils';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

export const RemindersInputPopoverMonthly: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && dates && dates.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, monthDays: dates, periodicity: 'MONTHLY'});
    }
  }, [time, dates]);

  const handleClick = (date: number): void => {
    setDates((prevState) => {
      if (prevState.includes(date)) {
        ArrayUtils.deleteItem(prevState, date);
      } else {
        prevState.push(date);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeSelect label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <CalendarSelect
        label={t('common:reminders.fields.monthdays')}
        required
        selectedDates={dates}
        handleClick={handleClick}
        showWeekend={false}
      />
    </Box>
  );
};

import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import CalendarSelect from '../calendar-select/calendar-select';
import {ParamDate} from '../../../../models/param-date';
import {DateConverters} from '../../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverMonthly: FC<Props> = ({setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && dates && dates.length > 0) {
      const paramDate: ParamDate = DateConverters.getParamDateFromTime(time);
      setReminder({date: paramDate, monthDates: dates, periodicity: 'monthly'});
    }
  }, [time, dates]);

  const handleClick = (date: number): void => {
    setDates((prevState) => {
      if (prevState.includes(date)) {
        prevState.splice(prevState.indexOf(date), 1);
      } else {
        prevState.push(date);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeInput label={t('items:fields.time.label')} required time={time} setTime={setTime} />
      <CalendarSelect
        label={t('items:fields.monthdays.label')}
        required
        selectedDates={dates}
        handleClick={handleClick}
        showWeekend={false}
      />
    </Box>
  );
};

export default RemindersInputPopoverMonthly;

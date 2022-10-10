import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/reminder.model';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../models/date-params.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import TimeSelectInput from '../TimeSelectInput';
import DaysSelect from '../DaysSelect';
import {makeStyles, Theme} from '@material-ui/core/styles';

type FormikRemindersInputPopoverWeeklyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverWeekly = ({setReminder, timezone}: FormikRemindersInputPopoverWeeklyProps) => {
  const classes = formikRemindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && days && days.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
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
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DaysSelect
        label={t('common:reminders.fields.weekdays')}
        required
        selectedDays={days}
        handleClick={handleClick}
      />
    </Box>
  );
};

const formikRemindersInputPopoverItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    '& > *': {
      width: '80%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export default FormikRemindersInputPopoverWeekly;

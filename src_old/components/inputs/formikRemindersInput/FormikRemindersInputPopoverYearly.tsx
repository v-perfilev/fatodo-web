import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/reminder.model';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../models/date-params.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TimeSelectInput from '../TimeSelectInput';
import DateSelect from '../dateSelect/DateSelect';

type FormikRemindersInputPopoverYearlyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverYearly = ({setReminder, timezone}: FormikRemindersInputPopoverYearlyProps) => {
  const classes = formikRemindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && date) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, date, timezone, true);
      setReminder({date: paramDate, periodicity: 'YEARLY'});
    }
  }, [time, date]);

  return (
    <Box className={classes.root}>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DateSelect
        label={t('common:reminders.fields.date')}
        required
        date={date}
        setDate={setDate}
        firstInputType="month"
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

export default FormikRemindersInputPopoverYearly;

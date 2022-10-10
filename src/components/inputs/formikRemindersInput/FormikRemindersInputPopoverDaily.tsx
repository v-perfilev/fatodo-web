import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/reminder.model';
import {Box} from '@material-ui/core';
import {DateParams} from '../../../models/date-params.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {useTranslation} from 'react-i18next';
import TimeSelectInput from '../TimeSelectInput';
import {makeStyles, Theme} from '@material-ui/core/styles';

type FormikRemindersInputPopoverDailyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverDaily = ({setReminder, timezone}: FormikRemindersInputPopoverDailyProps) => {
  const classes = formikRemindersInputPopoverItemStyles();
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
      setReminder({date: paramDate, periodicity: 'DAILY'});
    }
  }, [time]);

  return (
    <Box className={classes.root}>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
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

export default FormikRemindersInputPopoverDaily;

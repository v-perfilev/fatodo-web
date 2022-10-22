import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateConverters';
import TimeSelectInput from '../TimeSelectInput';

type FormikRemindersInputPopoverDailyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverDaily = ({setReminder, timezone}: FormikRemindersInputPopoverDailyProps) => {
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

  return <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />;
};

export default FormikRemindersInputPopoverDaily;

import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateConverters';
import TimeSelectInput from '../TimeSelectInput';
import DateSelect from '../dateSelect/DateSelect';

type FormikRemindersInputPopoverOnceProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverOnce = ({setReminder, timezone}: FormikRemindersInputPopoverOnceProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && date) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, date, timezone);
      setReminder({date: paramDate, periodicity: 'ONCE'});
    }
  }, [time, date]);

  return (
    <>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DateSelect label={t('common:reminders.fields.date')} required date={date} setDate={setDate} />
    </>
  );
};

export default FormikRemindersInputPopoverOnce;

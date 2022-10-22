import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateConverters';
import TimeSelectInput from '../TimeSelectInput';
import DateSelect from '../dateSelect/DateSelect';

type FormikRemindersInputPopoverYearlyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverYearly = ({setReminder, timezone}: FormikRemindersInputPopoverYearlyProps) => {
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
    <>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DateSelect
        label={t('common:reminders.fields.date')}
        required
        date={date}
        setDate={setDate}
        firstInputType="month"
      />
    </>
  );
};

export default FormikRemindersInputPopoverYearly;

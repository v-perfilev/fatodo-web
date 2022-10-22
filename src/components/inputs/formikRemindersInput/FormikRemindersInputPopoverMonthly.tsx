import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import TimeSelectInput from '../TimeSelectInput';
import CalendarSelect from '../CalendarSelect';

type FormikRemindersInputPopoverMonthlyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverMonthly = ({setReminder, timezone}: FormikRemindersInputPopoverMonthlyProps) => {
  const {t} = useTranslation();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
    setReminder(null);
  }, []);

  useEffect(() => {
    if (time && dates && dates.length > 0) {
      const paramDate: DateParams = DateConverters.getParamDateFromTimeAndDate(time, null, timezone);
      setReminder({date: paramDate, monthDays: dates, periodicity: 'MONTHLY'});
    }
  }, [time, dates]);

  const handleClick = (date: number): void => {
    setDates((prevState) => {
      if (prevState.includes(date)) {
        prevState = ArrayUtils.deleteValue(prevState, date);
      } else {
        prevState.push(date);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <CalendarSelect
        label={t('common:reminders.fields.monthdays')}
        required
        selectedDates={dates}
        handleClick={handleClick}
        showWeekend={false}
      />
    </>
  );
};

export default FormikRemindersInputPopoverMonthly;

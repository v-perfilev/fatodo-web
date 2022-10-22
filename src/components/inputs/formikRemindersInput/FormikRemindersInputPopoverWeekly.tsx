import React, {useEffect, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import {useTranslation} from 'react-i18next';
import {DateParams} from '../../../models/DateParams';
import {DateConverters} from '../../../shared/utils/DateConverters';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import TimeSelectInput from '../TimeSelectInput';
import DaysSelect from '../DaysSelect';

type FormikRemindersInputPopoverWeeklyProps = {
  setReminder: (reminder: Reminder) => void;
  timezone: string;
};

const FormikRemindersInputPopoverWeekly = ({setReminder, timezone}: FormikRemindersInputPopoverWeeklyProps) => {
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
        prevState = ArrayUtils.deleteValue(prevState, day);
      } else {
        prevState.push(day);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <>
      <TimeSelectInput label={t('common:reminders.fields.time')} required time={time} setTime={setTime} />
      <DaysSelect
        label={t('common:reminders.fields.weekdays')}
        required
        selectedDays={days}
        handleClick={handleClick}
      />
    </>
  );
};

export default FormikRemindersInputPopoverWeekly;

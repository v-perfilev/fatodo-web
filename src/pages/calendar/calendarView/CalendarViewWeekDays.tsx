import React, {useMemo} from 'react';
import FBox from '../../../components/boxes/FBox';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {useTranslation} from 'react-i18next';
import {Typography} from '@mui/material';

const CalendarViewWeekDays = () => {
  const {i18n} = useTranslation();

  const dayNames = useMemo(() => DateUtils.getWeekdayNames(), [i18n.language]);

  return (
    <FBox>
      {dayNames.map((day) => (
        <FBox flexBasis={1} justifyContent="center" alignItems="center" key={day}>
          <Typography fontSize={14} fontWeight="bold" color="grey.400">
            {day.toUpperCase()}
          </Typography>
        </FBox>
      ))}
    </FBox>
  );
};

export default CalendarViewWeekDays;

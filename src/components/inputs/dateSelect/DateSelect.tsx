import React, {useEffect, useState} from 'react';
import DateSelectYear from './DateSelectYear';
import DateSelectMonth from './DateSelectMonth';
import DateSelectDate from './DateSelectDate';
import {Box, Fade, SxProps, TextField} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {UserAccount} from '../../../models/User';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';

type InputType = 'year' | 'month' | 'date';

type DateSelectProps = {
  label: string;
  required?: boolean;
  date: Date;
  setDate: (date: Date) => void;
  firstInputType?: InputType;
};

const formatValue = (date: Date, account: UserAccount, withYear: boolean): string => {
  return withYear
    ? DateFormatters.formatDate(date, account, undefined, 'FULL')
    : DateFormatters.formatDate(date, account, undefined, 'SHORT');
};

const DateSelect = ({label, required, date, setDate, firstInputType}: DateSelectProps) => {
  const [inputType, setInputType] = useState<InputType>();
  const account = useAppSelector(AuthSelectors.account);

  useEffect(() => {
    setDate(date);
  }, []);

  const formattedDate = date ? formatValue(date, account, !firstInputType || firstInputType === 'year') : '';

  const openInput = (): void => {
    const newDate = date ?? new Date();
    if (!firstInputType || firstInputType === 'year') {
      setInputType('year');
    } else {
      newDate.setFullYear(1970);
      setInputType('month');
    }
    setDate(newDate);
  };

  const handleChange = (changedDate: Date): void => {
    if (inputType === 'year') {
      setDate(changedDate);
      setInputType('month');
    } else if (inputType === 'month') {
      setDate(changedDate);
      setInputType('date');
    } else if (inputType === 'date') {
      setDate(changedDate);
      setInputType(null);
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        required={required}
        value={formattedDate}
        InputProps={{readOnly: true}}
        onClick={openInput}
        fullWidth
      />
      <Fade in={!!inputType}>
        <Box sx={containerStyles}>
          {inputType === 'year' && <DateSelectYear {...{date, handleChange}} />}
          {inputType === 'month' && <DateSelectMonth {...{date, handleChange}} />}
          {inputType === 'date' && <DateSelectDate {...{date, handleChange}} />}
        </Box>
      </Fade>
    </Box>
  );
};

const containerStyles: SxProps = (theme: Theme) => ({
  zIndex: 1000,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
});

export default DateSelect;

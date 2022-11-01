import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import ModalDialog from '../../../components/modals/ModalDialog';
import {Button, Grid, SxProps} from '@mui/material';
import {MonthPicker, YearPicker} from '@mui/x-date-pickers';
import moment, {Moment} from 'moment';

export type CalendarSelectMonthDialogProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  show: boolean;
  close: () => void;
};

export const defaultCalendarSelectMonthDialogProps: Readonly<CalendarSelectMonthDialogProps> = {
  month: undefined,
  selectMonth: undefined,
  show: false,
  close: (): void => null,
};

const CalendarSelectMonthDialog = ({month, selectMonth, show, close}: CalendarSelectMonthDialogProps) => {
  const {t} = useTranslation();
  const [value, setValue] = useState<Moment>();

  const handleSelect = (): void => {
    const calendarItem: CalendarItem = {year: value.year(), month: value.month()};
    selectMonth(calendarItem);
    close();
  };

  const handleYearChange = (date: Moment): void => {
    setValue((prevState) => moment({year: date.year(), month: prevState.month()}));
  };

  const handleMonthChange = (date: Moment): void => {
    setValue((prevState) => moment({year: prevState.year(), month: date.month()}));
  };

  useEffect(() => {
    if (month) {
      const date = moment({year: month.year, month: month.month});
      setValue(date);
    }
  }, [month]);

  const minDate = moment({year: 1900, month: 0});
  const maxDate = moment({year: 2100, month: 11});

  const content = value ? (
    <Grid container>
      <Grid sx={yearPickerStyles} item xs={3} md={4}>
        <YearPicker date={value} onChange={handleYearChange} minDate={minDate} maxDate={maxDate} />
      </Grid>
      <Grid sx={monthPickerStyles} item xs={9} md={8}>
        <MonthPicker date={value} onChange={handleMonthChange} />
      </Grid>
    </Grid>
  ) : null;

  const actions = (
    <>
      <Button variant="text" color="secondary" onClick={close}>
        {t('calendar:selectMonth.buttons.cancel')}
      </Button>
      <Button variant="text" color="primary" onClick={handleSelect}>
        {t('calendar:selectMonth.buttons.send')}
      </Button>
    </>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('calendar:selectMonth.title')}
      content={content}
      actions={actions}
    />
  );
};

const yearPickerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .MuiYearPicker-root': {
    padding: '0',
  },
  '& .PrivatePickersYear-root': {
    flexBasis: '100%',
  },
  '& .PrivatePickersYear-yearButton': {
    width: 'auto',
    height: 'auto',
  },
};

const monthPickerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .MuiMonthPicker-root': {
    width: '100%',
  },
};

export default memo(CalendarSelectMonthDialog);

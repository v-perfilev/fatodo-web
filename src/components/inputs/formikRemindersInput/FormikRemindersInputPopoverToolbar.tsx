import React, {useState} from 'react';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
import {useTranslation} from 'react-i18next';
import {ReminderPeriodicity} from '../../../models/Reminder';
import {SxProps, ToggleButton, ToggleButtonGroup, Toolbar, Typography, Zoom} from '@mui/material';

type FormikRemindersInputPopoverToolbarProps = {
  periodicity: ReminderPeriodicity;
  setPeriodicity: (periodicity: ReminderPeriodicity) => void;
};

const FormikRemindersInputPopoverToolbar = ({periodicity, setPeriodicity}: FormikRemindersInputPopoverToolbarProps) => {
  const [show, setShow] = useState(true);
  const {t} = useTranslation();

  const handlePeriodicity = (event: React.MouseEvent<HTMLElement>, newPeriodicity: ReminderPeriodicity): void => {
    if (newPeriodicity !== null && periodicity !== newPeriodicity) {
      setShow(false);
      setTimeout(() => {
        setShow(true);
        setPeriodicity(newPeriodicity);
      }, 150);
    }
  };

  return (
    <Toolbar sx={toolbarStyles}>
      <ToggleButtonGroup value={periodicity} exclusive size="small" onChange={handlePeriodicity}>
        <ToggleButton sx={buttonStyles} value="ONCE">
          <OnceIcon />
        </ToggleButton>
        <ToggleButton sx={buttonStyles} value="DAILY">
          <DayIcon />
        </ToggleButton>
        <ToggleButton sx={buttonStyles} value="WEEKLY">
          <WeekIcon />
        </ToggleButton>
        <ToggleButton sx={buttonStyles} value="MONTHLY">
          <MonthIcon />
        </ToggleButton>
        <ToggleButton sx={buttonStyles} value="YEARLY">
          <YearIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Zoom in={show} timeout={150}>
        <Typography sx={titleStyles} fontWeight="600" color="primary.contrastText" fontSize={16}>
          {t('common:reminders.periodicity.' + periodicity)}
        </Typography>
      </Zoom>
    </Toolbar>
  );
};

const toolbarStyles: SxProps = {
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'primary.main',
  paddingTop: 1,
};

const buttonStyles: SxProps = {
  color: 'rgba(255, 255, 255, 0.7) !important',
  border: '1px solid ' + 'rgba(255, 255, 255, 0.7) !important',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
  },
  '&.Mui-selected': {
    color: 'rgba(255, 255, 255, 1) !important',
    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25) !important',
    },
  },
};

const titleStyles: SxProps = {
  marginTop: 0.5,
};

export default FormikRemindersInputPopoverToolbar;

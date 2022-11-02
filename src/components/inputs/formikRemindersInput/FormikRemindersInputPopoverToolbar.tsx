import React, {useState} from 'react';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
import {useTranslation} from 'react-i18next';
import {ReminderPeriodicity} from '../../../models/Reminder';
import {alpha, SxProps, ToggleButton, ToggleButtonGroup, Toolbar, Typography, Zoom} from '@mui/material';
import {Theme} from '@mui/material/styles';

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
        <Typography sx={titleStyles} fontWeight="bold" color="primary" fontSize={16}>
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
  paddingTop: 1,
};

const buttonStyles: SxProps = (theme: Theme) => ({
  color: alpha(theme.palette.primary.main, 0.7),
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: alpha(theme.palette.primary.main, 0.7),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
  '&.Mui-selected': {
    color: alpha(theme.palette.primary.main, 1),
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
  },
});

const titleStyles: SxProps = {
  marginTop: 1,
};

export default FormikRemindersInputPopoverToolbar;

import React, {useState} from 'react';
import {Toolbar, Typography, Zoom} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {ToggleButton} from '@material-ui/lab';
import {ReminderPeriodicity} from '../../../models/reminder.model';
import OnceIcon from '../../icons/OnceIcon';
import DayIcon from '../../icons/DayIcon';
import WeekIcon from '../../icons/WeekIcon';
import MonthIcon from '../../icons/MonthIcon';
import YearIcon from '../../icons/YearIcon';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';

type FormikRemindersInputPopoverToolbarProps = {
  periodicity: ReminderPeriodicity;
  setPeriodicity: (periodicity: ReminderPeriodicity) => void;
};

const FormikRemindersInputPopoverToolbar = ({periodicity, setPeriodicity}: FormikRemindersInputPopoverToolbarProps) => {
  const classes = formikRemindersInputPopoverToolbarStyles();
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
    <Toolbar className={classes.root}>
      <ToggleButtonGroup value={periodicity} exclusive size="small" onChange={handlePeriodicity}>
        <ToggleButton className={classes.button} value="ONCE">
          <OnceIcon />
        </ToggleButton>
        <ToggleButton className={classes.button} value="DAILY">
          <DayIcon />
        </ToggleButton>
        <ToggleButton className={classes.button} value="WEEKLY">
          <WeekIcon />
        </ToggleButton>
        <ToggleButton className={classes.button} value="MONTHLY">
          <MonthIcon />
        </ToggleButton>
        <ToggleButton className={classes.button} value="YEARLY">
          <YearIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Zoom in={show} timeout={150}>
        <Typography className={classes.typography}>{t('common:reminders.periodicity.' + periodicity)}</Typography>
      </Zoom>
    </Toolbar>
  );
};

const formikRemindersInputPopoverToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(1),
  },
  button: {
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
  },
  typography: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.2rem',
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
  },
}));

export default FormikRemindersInputPopoverToolbar;

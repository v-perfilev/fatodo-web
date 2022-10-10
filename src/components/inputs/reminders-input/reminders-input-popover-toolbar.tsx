import React, {FC, useState} from 'react';
import {Toolbar, Typography, Zoom} from '@material-ui/core';
import {remindersInputPopoverToolbarStyles} from './_styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {ToggleButton} from '@material-ui/lab';
import {ReminderPeriodicity} from '../../../models/reminder.model';
import {OnceIcon} from '../../icons/OnceIcon';
import {DayIcon} from '../../icons/DayIcon';
import {WeekIcon} from '../../icons/WeekIcon';
import {MonthIcon} from '../../icons/MonthIcon';
import {YearIcon} from '../../icons/YearIcon';
import {useTranslation} from 'react-i18next';

type Props = {
  periodicity: ReminderPeriodicity;
  setPeriodicity: (periodicity: ReminderPeriodicity) => void;
};

export const RemindersInputPopoverToolbar: FC<Props> = ({periodicity, setPeriodicity}: Props) => {
  const classes = remindersInputPopoverToolbarStyles();
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

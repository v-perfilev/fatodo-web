import React, {FC, useState} from 'react';
import {Toolbar, Typography, Zoom} from '@material-ui/core';
import {remindersInputPopoverToolbarStyles} from './_styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {ToggleButton} from '@material-ui/lab';
import {ReminderPeriodicity} from '../../../../models/reminder';
import {OnceIcon} from '../../icons/once-icon';
import {DayIcon} from '../../icons/day-icon';
import {WeekIcon} from '../../icons/week-icon';
import {MonthIcon} from '../../icons/month-icon';
import {YearIcon} from '../../icons/year-icon';
import {useTranslation} from 'react-i18next';

type Props = {
  periodicity: ReminderPeriodicity;
  setPeriodicity: (periodicity: ReminderPeriodicity) => void;
};

const RemindersInputPopoverToolbar: FC<Props> = ({periodicity, setPeriodicity}: Props) => {
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
        <ToggleButton value="once">
          <OnceIcon />
        </ToggleButton>
        <ToggleButton value="daily">
          <DayIcon />
        </ToggleButton>
        <ToggleButton value="weekly">
          <WeekIcon />
        </ToggleButton>
        <ToggleButton value="monthly">
          <MonthIcon />
        </ToggleButton>
        <ToggleButton value="yearly">
          <YearIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Zoom in={show} timeout={150}>
        <Typography>{t('items:reminder.periodicity.' + periodicity)}</Typography>
      </Zoom>
    </Toolbar>
  );
};

export default RemindersInputPopoverToolbar;

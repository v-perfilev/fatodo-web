import React, {HTMLAttributes} from 'react';
import {Box, Button, FormLabel} from '@material-ui/core';
import csx from 'classnames';
import {DateUtils} from '../../shared/utils/date.utils';
import {makeStyles, Theme} from '@material-ui/core/styles';

type DaysSelectProps = HTMLAttributes<HTMLElement> & {
  label?: string;
  required?: boolean;
  selectedDays: number[];
  handleClick: (day: number) => void;
};

const DaysSelect = ({label, required, selectedDays, handleClick, className}: DaysSelectProps) => {
  const classes = daysSelectStyles();

  const dayNames = DateUtils.getWeekdayNames();
  const dayNumbers = DateUtils.getWeekdayNumbers();

  const weekdays = dayNames.map((weekday, index) => {
    const dayNumber = dayNumbers[index];
    const classnames = csx(classes.day, {[classes.selectedDay]: selectedDays.includes(dayNumber)});
    const handleClickOnDay = (): void => handleClick(dayNumber);
    return (
      <Button className={classnames} key={index} onClick={handleClickOnDay}>
        {weekday}
      </Button>
    );
  });

  const classnames = csx(classes.root, className);
  return (
    <Box className={classnames}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <Box className={classes.week}>{weekdays}</Box>
    </Box>
  );
};

const daysSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormLabel-root': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0.5),
    },
  },
  weekHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 500,
    color: theme.palette.grey['500'],
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    minWidth: 34,
    maxWidth: 34,
    height: 34,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2,
    padding: 0,
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default DaysSelect;

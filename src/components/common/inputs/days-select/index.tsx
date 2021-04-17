import React, {FC, HTMLAttributes} from 'react';
import {Box, Button, FormLabel} from '@material-ui/core';
import {daysSelectStyles} from './_styles';
import csx from 'classnames';
import {DateUtils} from '../../../../shared/utils/date.utils';

type Props = HTMLAttributes<HTMLElement> & {
  label?: string;
  required?: boolean;
  selectedDays: number[];
  handleClick: (day: number) => void;
};

export const DaysSelect: FC<Props> = ({label, required, selectedDays, handleClick, className}: Props) => {
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

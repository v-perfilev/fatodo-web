import React, {FC, HTMLAttributes} from 'react';
import {Box, Button, FormLabel} from '@material-ui/core';
import {daysSelectStyles} from './_styles';
import moment from 'moment';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  label?: string;
  required?: boolean;
  selectedDays: number[];
  handleClick: (day: number) => void;
}

const getWeekdayNumbers = (): number[] => {
  const firstDayOfWeek = moment().startOf('week').day();
  return Array.from({length: 7}, (_, i) => (i + firstDayOfWeek) % 7);
};

const DaysSelect: FC<Props> = ({label, required, selectedDays, handleClick, className}: Props) => {
  const classes = daysSelectStyles();

  const dayNames = moment.weekdaysShort(true);
  const dayNumbers = getWeekdayNumbers();

  const weekdays = dayNames.map((weekday, index) => {
    const dayNumber = dayNumbers[index];
    const classnames = csx(classes.day, {[classes.selectedDay]: selectedDays.includes(dayNumber)});
    return (
      <Button className={classnames} key={index} onClick={() => handleClick(dayNumber)}>
        {weekday}
      </Button>
    );
  });

  const classnames = csx(classes.root, className);
  return (
    <Box className={classnames}>
      {label && (
        <FormLabel required={required}>{label}</FormLabel>
      )}
      <Box className={classes.week}>
        {weekdays}
      </Box>
    </Box>
  );
};

export default DaysSelect;

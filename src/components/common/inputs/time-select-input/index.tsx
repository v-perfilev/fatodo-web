import React, {FC, useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import {Moment} from 'moment';
import {ClockView} from '@material-ui/pickers';
import {timeInputStyles} from './_styles';
import {DateConverters, DateFormatters} from '../../../../shared/utils/date.utils';

type Props = {
  label: string;
  required?: boolean;
  time: Date;
  setTime: (time: Date) => void;
};

export const TimeSelectInput: FC<Props> = ({label, required, time, setTime}: Props) => {
  const classes = timeInputStyles();
  const [showClock, setShowClock] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);

  const toggleHoursView = (): void => setShowClock(true);
  const toggleMinutesView = (): void => setShowMinutes(true);
  const hideAllViews = (): void => {
    setShowClock(false);
    setShowMinutes(false);
  };

  const handleClock = (momentTime: Moment): void => {
    const timeDate = DateConverters.getTimeFromMoment(momentTime);
    setTime(timeDate);
    if (!showMinutes) {
      toggleMinutesView();
    } else {
      hideAllViews();
    }
  };

  const formattedTime = time ? DateFormatters.formatTime(time) : '';
  const timeMoment = DateConverters.getMomentFromTime(time);

  return (
    <Box>
      <TextField
        label={label}
        required={required}
        value={formattedTime}
        InputProps={{readOnly: true}}
        onClick={toggleHoursView}
        className={classes.textField}
      />
      <Fade in={showClock}>
        <Box className={classes.box}>
          <ClockView
            date={timeMoment}
            type={showMinutes ? 'minutes' : 'hours'}
            ampm={false}
            onHourChange={handleClock}
            onMinutesChange={handleClock}
            onSecondsChange={handleClock}
          />
        </Box>
      </Fade>
    </Box>
  );
};

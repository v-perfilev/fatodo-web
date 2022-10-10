import React, {useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import {Moment} from 'moment';
import {ClockView} from '@material-ui/pickers';
import {DateConverters, DateFormatters} from '../../shared/utils/date.utils';
import {makeStyles, Theme} from '@material-ui/core/styles';

type TimeSelectInputProps = {
  label: string;
  required?: boolean;
  time: Date;
  setTime: (time: Date) => void;
};

const TimeSelectInput = ({label, required, time, setTime}: TimeSelectInputProps) => {
  const classes = timeSelectInputStyles();
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

const timeSelectInputStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
  },
  box: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default TimeSelectInput;

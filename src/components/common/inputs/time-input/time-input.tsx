import React, {FC, useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import moment, {Moment} from 'moment';
import {ClockView} from '@material-ui/pickers';
import {timeInputStyles} from './_styles';
import {DateUtils} from '../../../../shared/utils/date.utils';

type Props = {
  label: string;
  required?: boolean;
  time: Date;
  setTime: (time: Date) => void;
}

const TimeInput: FC<Props> = ({label, required, time, setTime}: Props) => {
  const classes = timeInputStyles();
  const [showClock, setShowClock] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);

  const toggleHoursView = (): void => setShowClock(true);
  const toggleMinutesView = (): void => setShowMinutes(true);
  const hideAllViews = (): void => {
    setShowClock(false);
    setShowMinutes(false);
  };

  const handleClock = (moment: Moment) => {
    const date = new Date();
    date.setHours(moment.hours());
    date.setMinutes(moment.minutes());
    setTime(date);
    if (!showMinutes) {
      toggleMinutesView();
    } else {
      hideAllViews();
    }
  };

  const formattedTime = time ? DateUtils.formatTime(time) : '';
  const timeMoment = time ? moment(time) : moment(new Date());

  return (
    <>
      <TextField label={label} required={required} value={formattedTime} InputProps={{readOnly: true}}
                 onClick={toggleHoursView} />
      <Fade in={showClock}>
        <Box className={classes.box}>
          <ClockView date={timeMoment} type={showMinutes ? 'minutes' : 'hours'} ampm={false}
                     onHourChange={handleClock}
                     onMinutesChange={handleClock}
                     onSecondsChange={handleClock} />
        </Box>
      </Fade>
    </>
  );
};

export default TimeInput;

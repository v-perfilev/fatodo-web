import React, {useState} from 'react';
import moment, {Moment} from 'moment';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {Box, Fade, SxProps, TextField} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {ClockPicker} from '@mui/x-date-pickers';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {UserAccount} from '../../models/User';
import {DateUtils} from '../../shared/utils/DateUtils';

type TimeSelectInputProps = {
  label: string;
  time: Date;
  setTime: (time: Date) => void;
  required?: boolean;
};

const formatValue = (date: Date, account: UserAccount): string => {
  return DateFormatters.formatDate(date, account, 'FULL');
};

const TimeSelectInput = ({label, time, setTime, required}: TimeSelectInputProps) => {
  const [showClock, setShowClock] = useState<boolean>(false);
  const [showMinutes, setShowMinutes] = useState<boolean>(false);
  const account = useAppSelector(AuthSelectors.account);
  const ampm = account.info.timeFormat === 'H12';

  const toggleHoursView = (): void => setShowClock(true);
  const toggleMinutesView = (): void => setShowMinutes(true);

  const hideAllViews = (): void => {
    setShowClock(false);
    setShowMinutes(false);
  };

  const handleClock = (momentTime: Moment): void => {
    console.log(momentTime, momentTime.hours());
    const timeDate = DateUtils.getTimeFromMoment(momentTime);
    setTime(timeDate);
    if (!showMinutes) {
      toggleMinutesView();
    } else {
      hideAllViews();
    }
  };

  const formattedTime = time ? formatValue(time, account) : '';
  const timeMoment = time ? moment(time) : moment();

  return (
    <Box>
      <TextField
        label={label}
        required={required}
        value={formattedTime}
        InputProps={{readOnly: true}}
        onClick={toggleHoursView}
        fullWidth
      />
      <Fade in={showClock}>
        <Box sx={clockContainerStyles}>
          <ClockPicker date={timeMoment} view={showMinutes ? 'minutes' : 'hours'} ampm={ampm} onChange={handleClock} />
        </Box>
      </Fade>
    </Box>
  );
};

const clockContainerStyles: SxProps = (theme: Theme) => ({
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
});

export default TimeSelectInput;

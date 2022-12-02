import React, {memo} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {CalendarDate} from '../../../../models/Calendar';
import {SxProps, Typography, useMediaQuery} from '@mui/material';
import CalendarViewDateReminders from './CalendarViewDateReminders';
import FBox from '../../../../components/boxes/FBox';
import {CalendarReminder} from '../../../../models/Reminder';
import {Theme} from '@mui/material/styles';

type CalendarViewDateContainerProps = {
  activeMonthIndex: number;
  date: CalendarDate;
  reminders: CalendarReminder[];
};

const CalendarViewDateContainer = ({activeMonthIndex, date, reminders}: CalendarViewDateContainerProps) => {
  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const bg = activeMonthIndex === date.monthIndex ? 'grey.50' : 'grey.200';
  const color = 'grey.500';

  return (
    <FVStack sx={containerStyles(bg, isSmallDevice)} spacing={0.5}>
      <FHStack flexGrow={0} justifyContent="flex-end">
        <Typography fontSize={14} fontWeight="bold" color={color}>
          {date.date}
        </Typography>
      </FHStack>
      <FBox sx={remindersStyles}>
        <CalendarViewDateReminders reminders={reminders} />
      </FBox>
    </FVStack>
  );
};

const containerStyles = (backgroundColor: string, isSmallDevice: boolean): SxProps => ({
  paddingX: isSmallDevice ? 0.5 : 1.5,
  paddingY: isSmallDevice ? 0.5 : 1,
  borderRadius: 3,
  backgroundColor,
});

const remindersStyles: SxProps = {
  height: 50,
};

export default memo(CalendarViewDateContainer);

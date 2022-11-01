import React from 'React';
import {useAppDispatch} from '../../../store/store';
import {Box} from '@mui/material';

type CalendarViewContainerProps = {
  toggleCollapsed?: () => void;
};

const CalendarViewContainer = ({toggleCollapsed}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();

  return <Box />;
};

export default CalendarViewContainer;

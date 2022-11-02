import React, {useCallback} from 'react';
import PageMultiColumn, {PageMultipleColumnChildrenProps} from '../../../components/layouts/PageMultiColumn';
import EventList from '../../events/eventList/EventList';
import CalendarViewContainer from './CalendarViewContainer';

const CalendarView = () => {
  const mainElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => <CalendarViewContainer toggleCollapsed={toggleCollapsed} />,
    [],
  );

  const additionalElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => <EventList toggleCollapsed={toggleCollapsed} />,
    [],
  );

  return <PageMultiColumn {...{mainElement, additionalElement}} />;
};

export default CalendarView;

import React, {useCallback} from 'react';
import PageMultiColumn, {PageMultipleColumnChildrenProps} from '../../../components/layouts/PageMultiColumn';
import GroupListContainer from './GroupListContainer';
import EventList from '../../events/eventList/EventList';

const GroupList = () => {
  const mainElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => <GroupListContainer toggleCollapsed={toggleCollapsed} />,
    [],
  );

  const additionalElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => <EventList toggleCollapsed={toggleCollapsed} />,
    [],
  );

  return <PageMultiColumn {...{mainElement, additionalElement}} />;
};

export default GroupList;

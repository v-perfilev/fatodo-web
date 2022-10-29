import React from 'React';
import PageMultiColumn, {PageMultipleColumnChildrenProps} from '../../../components/layouts/PageMultiColumn';
import {useCallback} from 'react';
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

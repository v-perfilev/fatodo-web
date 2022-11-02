import React, {useCallback} from 'react';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import PageMultiColumn, {PageMultipleColumnChildrenProps} from '../../../components/layouts/PageMultiColumn';
import GroupViewContainer from './GroupViewContainer';
import CommentList from '../../comments/commentList/CommentList';

const GroupView = ({group, groupId, loading}: WithGroupProps) => {
  const mainElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => (
      <GroupViewContainer {...{group, groupId, loading, toggleCollapsed}} />
    ),
    [group, groupId, loading],
  );

  const additionalElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => (
      <CommentList targetId={groupId} toggleCollapsed={toggleCollapsed} />
    ),
    [groupId],
  );

  return <PageMultiColumn {...{mainElement, additionalElement}} />;
};

export default flowRight([withGroupContainer, withThemeProvider])(GroupView);

import React from 'React';
import {flowRight} from 'lodash';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import PageMultiColumn, {PageMultipleColumnChildrenProps} from '../../../components/layouts/PageMultiColumn';
import CommentList from '../../comments/commentList/CommentList';
import ItemViewContainer from './ItemViewContainer';
import {useCallback} from 'react';

const ItemView = ({group, item, loading}: WithItemProps) => {
  const mainElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => (
      <ItemViewContainer {...{group, item, loading, toggleCollapsed}} />
    ),
    [group, item, loading],
  );

  const additionalElement = useCallback(
    ({toggleCollapsed}: PageMultipleColumnChildrenProps) => (
      <CommentList targetId={item?.id} toggleCollapsed={toggleCollapsed} />
    ),
    [item],
  );

  return <PageMultiColumn {...{mainElement, additionalElement}} />;
};

export default flowRight([withItemContainer, withThemeProvider])(ItemView);

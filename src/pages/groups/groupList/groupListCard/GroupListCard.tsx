import React, {memo, useCallback} from 'react';
import GroupListCardHeader from './GroupListCardHeader';
import GroupListCardContent from './GroupListCardContent';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import GroupsSelectors from '../../../../store/groups/groupsSelectors';
import {flowRight} from 'lodash';
import {Collapse, SxProps} from '@mui/material';
import withThemeProvider from '../../../../shared/hocs/withThemeProvider';
import FVStack from '../../../../components/boxes/FVStack';

type GroupListCardProps = {
  group: Group;
  sorting: boolean;
  drag: any;
};

const GroupListCard = ({group, sorting, drag}: GroupListCardProps) => {
  const itemsSelector = useCallback(GroupsSelectors.makeItemsSelector(), []);
  const itemsCountSelector = useCallback(GroupsSelectors.makeItemsCountSelector(), []);
  const itemsCollapsedSelector = useCallback(GroupsSelectors.makeItemsCollapsedSelector(), []);
  const itemsLoadingSelector = useCallback(GroupsSelectors.makeItemsLoadingSelector(), []);
  const items = useAppSelector((state) => itemsSelector(state, group.id));
  const itemsCount = useAppSelector((state) => itemsCountSelector(state, group.id));
  const collapsed = useAppSelector((state) => itemsCollapsedSelector(state, group.id));
  const loading = useAppSelector((state) => itemsLoadingSelector(state, group.id));

  return (
    <FVStack spacing={0} py={1}>
      <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
      <Collapse sx={collapseStyles} in={!collapsed && !sorting}>
        <GroupListCardContent group={group} items={items} itemsCount={itemsCount} loading={loading} />
      </Collapse>
    </FVStack>
  );
};

const collapseStyles: SxProps = {
  width: '100%',
};

export default flowRight([withThemeProvider, memo])(GroupListCard);

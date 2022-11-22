import React from 'react';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import {GroupsActions} from '../../../../store/groups/groupsActions';
import {Box, IconButton} from '@mui/material';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';

type GroupListCardCollapseButtonProps = {
  group: Group;
  collapsed: boolean;
};

const GroupListCardCollapseButton = ({group, collapsed}: GroupListCardCollapseButtonProps) => {
  const dispatch = useAppDispatch();

  const setCollapsed = (groupId: string, value: boolean): void => {
    dispatch(GroupsActions.setCollapsed(groupId, value));
  };

  const handlePress = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed(group.id, !collapsed);
  };

  return (
    <Box color="white">
      <IconButton onClick={handlePress} color="inherit">
        <CollapsedIcon collapsed={!collapsed} />
      </IconButton>
    </Box>
  );
};

export default GroupListCardCollapseButton;

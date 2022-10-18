import React from 'react';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import {GroupsActions} from '../../../../store/groups/groupsActions';
import {IconButton} from '@mui/material';
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
    <IconButton onClick={handlePress}>
      <CollapsedIcon color="primary" collapsed={!collapsed} />
    </IconButton>
  );
};

export default GroupListCardCollapseButton;

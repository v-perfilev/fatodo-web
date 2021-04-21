import * as React from 'react';
import {FC, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import GroupGridItem from './group-preview-grid-item';
import {groupGridContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

const GroupPreviewGridContainer: FC = () => {
  const classes = groupGridContainerStyles();
  const {handleUserIds} = useUserListContext();
  const {objs: groups} = useGroupListContext();

  const loadUsers = (): void => {
    const userIds = groups
      .map((group) => group.users.map((user) => user.id))
      .reduce((acc, userIds) => {
        return [...acc, ...userIds];
      });
    handleUserIds(userIds);
  };

  useEffect(() => {
    loadUsers();
  }, [groups]);

  return (
    <Grid container className={classes.container}>
      {groups.map((group, i) => (
        <GroupGridItem key={i} group={group} />
      ))}
    </Grid>
  );
};

export default GroupPreviewGridContainer;

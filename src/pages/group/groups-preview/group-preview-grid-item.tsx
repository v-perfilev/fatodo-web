import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {Group} from '../../../models/group.model';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';
import GroupPreviewCard from './group-preview-card';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  group: Group;
  height: number;
};

const GroupPreviewGridItem: FC<Props> = ({group, height}: Props) => {
  const classes = groupGridItemStyles();
  const {handleUserIds} = useUserListContext();
  const {setObj: setGroup} = useGroupViewContext();

  const loadUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  useEffect(() => {
    loadUsers();
    setGroup(group);
  }, [group]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <GroupPreviewCard height={height} />
    </Grid>
  );
};

export default flowRight([memo, withGroupView, withUserList])(GroupPreviewGridItem);

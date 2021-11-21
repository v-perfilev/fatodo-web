import * as React from 'react';
import {FC} from 'react';
import {CardActions} from '@material-ui/core';
import {groupCardNotificationsStyles} from './_styles';
import {AvatarGroup} from '../../../components/surfaces';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

const GroupPreviewCardNotifications: FC = () => {
  const classes = groupCardNotificationsStyles();
  const {users} = useUserListContext();

  return (
    <CardActions className={classes.users}>
      <AvatarGroup users={users} />
    </CardActions>
  );
};

export default GroupPreviewCardNotifications;

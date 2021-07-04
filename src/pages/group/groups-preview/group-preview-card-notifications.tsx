import * as React from 'react';
import {FC} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../../components/icons/bell-icon';
import {MessageIcon} from '../../../components/icons/message-icon';
import {groupCardNotificationsStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {AvatarGroup} from '../../../components/surfaces';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

const GroupPreviewCardNotifications: FC = () => {
  const classes = groupCardNotificationsStyles();
  const {obj: group} = useGroupViewContext();
  const {users} = useUserListContext();

  return (
    <CardActions className={classes.deleteUser}>
      <AvatarGroup users={users} />
      <Box className={classes.badges}>
        <Badge color="primary" max={5} badgeContent={group.notificationCount}>
          <BellIcon className={classes.icon} />
        </Badge>
        <Badge color="primary" max={5} badgeContent={group.messageCount}>
          <MessageIcon className={classes.icon} />
        </Badge>
      </Box>
    </CardActions>
  );
};

export default GroupPreviewCardNotifications;

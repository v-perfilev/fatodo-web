import * as React from 'react';
import {FC} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import GroupPreviewCardAvatars from './group-preview-card-avatars';
import {groupCardNotificationsStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

const GroupPreviewCardNotifications: FC = () => {
  const classes = groupCardNotificationsStyles();
  const {group} = useGroupViewContext();

  return (
    <CardActions className={classes.actions}>
      <GroupPreviewCardAvatars />
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

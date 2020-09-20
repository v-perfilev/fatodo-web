import * as React from 'react';
import {FC, memo} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import GroupPreviewCardAvatars from './group-preview-card-avatars';
import {groupCardNotificationsStyles} from './_styles';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardNotifications: FC<Props> = ({group}: Props) => {
  const classes = groupCardNotificationsStyles();

  return (
    <CardActions className={classes.actions}>
      <GroupPreviewCardAvatars users={group.users} />
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

export default compose(memo)(GroupPreviewCardNotifications);

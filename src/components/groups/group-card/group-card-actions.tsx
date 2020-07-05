import * as React from 'react';
import {FC} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import GroupCardAvatars from './group-card-avatars';
import {groupCardActionsStyles} from './_styles';

interface Props {
  users: string[];
  notificationCount: number;
  messageCount: number;
}

const GroupCardActions: FC<Props> = ({users, notificationCount, messageCount}: Props) => {
  const classes = groupCardActionsStyles();

  return (
    <CardActions className={classes.actions}>
      <GroupCardAvatars users={users} />
      <Box className={classes.badges}>
        <Badge color="primary" max={5} badgeContent={notificationCount}>
          <BellIcon className={classes.icon} />
        </Badge>
        <Badge color="primary" max={5} badgeContent={messageCount}>
          <MessageIcon className={classes.icon} />
        </Badge>
      </Box>
    </CardActions>
  );
};

export default GroupCardActions;

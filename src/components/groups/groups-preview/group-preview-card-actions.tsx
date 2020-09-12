import * as React from 'react';
import {FC, memo} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import GroupPreviewCardAvatars from './group-preview-card-avatars';
import {groupCardActionsStyles} from './_styles';
import {compose} from 'recompose';
import {User} from '../../../models/user.model';

type Props = {
  users: User[];
  notificationCount: number;
  messageCount: number;
};

const GroupPreviewCardActions: FC<Props> = ({users, notificationCount, messageCount}: Props) => {
  const classes = groupCardActionsStyles();

  return (
    <CardActions className={classes.actions}>
      <GroupPreviewCardAvatars users={users} />
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

export default compose(memo)(GroupPreviewCardActions);

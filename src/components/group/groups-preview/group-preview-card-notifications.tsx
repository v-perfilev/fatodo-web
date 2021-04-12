import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import {groupCardNotificationsStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {AvatarGroup} from '../../common/surfaces';

const GroupPreviewCardNotifications: FC = () => {
  const classes = groupCardNotificationsStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = (ids: string[]): void => {
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    const ids = group.users.map((u) => u.id);
    loadUsers(ids);
  }, []);

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

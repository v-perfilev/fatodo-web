import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UserWithPopupView} from '../../common/views/user-with-popup-view';

const GroupPreviewCardAvatars: FC = () => {
  const classes = groupCardAvatarsStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const [users, setUsers] = useState<User[]>([]);

  const usersToShow = users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = users.length > AVATARS_IN_GROUP_CARD ? users.length - AVATARS_IN_GROUP_CARD : 0;

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
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <UserWithPopupView user={user} picSize="sm" key={index} />
      ))}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;

import {User} from '../../../../models/user.model';
import {avatarGroupStyles} from './_styles';
import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {AVATARS_IN_CARD} from '../../../group/_constants';
import {UserView, UserWithPopupView} from '../../views';
import csx from 'classnames';

type Props = {
  users: User[];
  onClick?: () => void;
  withPopup?: boolean;
};

export const AvatarGroup: FC<Props> = ({users, onClick, withPopup}: Props) => {
  const classes = avatarGroupStyles();
  const classNames = csx(classes.avatars, {[classes.pointer]: onClick});

  const usersToShow = users.slice(0, AVATARS_IN_CARD);
  const moreThanLimit = users.length > AVATARS_IN_CARD ? users.length - AVATARS_IN_CARD : 0;

  return (
    <Box className={classNames} onClick={onClick}>
      {usersToShow.map((user, index) =>
        withPopup ? (
          <UserWithPopupView user={user} picSize="sm" key={index} />
        ) : (
          <UserView user={user} picSize="sm" key={index} />
        )
      )}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

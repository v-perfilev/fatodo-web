import {User} from '../../../models/user.model';
import {avatarGroupStyles} from './_styles';
import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {AVATARS_IN_CARD, SHORTEN_AVATARS_IN_CARD} from '../../../pages/group/_constants';
import {UserView, UserWithPopupView} from '../../views';
import csx from 'classnames';

type Props = {
  users: User[];
  onClick?: () => void;
  withPopup?: boolean;
  shorten?: boolean;
};

export const AvatarGroup: FC<Props> = ({users, onClick, withPopup, shorten}: Props) => {
  const classes = avatarGroupStyles();

  const avatarsCount = shorten ? SHORTEN_AVATARS_IN_CARD : AVATARS_IN_CARD;
  const usersToShow = users.slice(0, avatarsCount);
  const moreThanLimit = users.length > avatarsCount ? users.length - avatarsCount : 0;

  const classNames = csx(classes.avatars, {[classes.pointer]: onClick});

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

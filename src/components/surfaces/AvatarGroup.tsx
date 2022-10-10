import {User} from '../../models/user.model';
import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {AVATARS_IN_CARD} from '../../pages/group/_constants';
import {UserView, UserWithPopupView} from '../views';
import csx from 'classnames';
import {makeStyles, Theme} from '@material-ui/core/styles';

type AvatarGroupProps = {
  users: User[];
  onClick?: () => void;
  withPopup?: boolean;
  withInvertedBorder?: boolean;
};

const AvatarGroup = ({users, onClick, withPopup, withInvertedBorder}: AvatarGroupProps) => {
  const classes = avatarGroupStyles();

  const usersToShow = users.slice(0, AVATARS_IN_CARD);
  const moreThanLimit = users.length > AVATARS_IN_CARD ? users.length - AVATARS_IN_CARD : 0;

  const classNames = csx(classes.avatars, {[classes.pointer]: onClick});

  return (
    <Box className={classNames} onClick={onClick}>
      {usersToShow.map((user, index) =>
        withPopup ? (
          <UserWithPopupView user={user} picSize="md" key={index} withInvertedBorder={withInvertedBorder} />
        ) : (
          <UserView user={user} picSize="md" key={index} withInvertedBorder={withInvertedBorder} />
        ),
      )}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

const avatarGroupStyles = makeStyles((theme: Theme) => ({
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& > *': {
      marginLeft: theme.spacing(-1.5),
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  count: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.grey['400'],
  },
  pointer: {
    cursor: 'pointer',
  },
}));

export default AvatarGroup;

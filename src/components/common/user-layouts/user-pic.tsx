import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {User} from '../../../models/user';
import {Avatar} from '@material-ui/core';
import csx from 'classnames';
import {userPicStyles} from './_styles';

type Props = HTMLAttributes<any> & {
  user: User;
};

const UserPic: FC<Props> = ({user, className}: Props) => {
  const classes = userPicStyles();
  const classNames = csx(classes.root, className);

  const url = user.avatarUrl ? user.avatarUrl : '.';

  return <Avatar alt={user.username} src={url} className={classNames} />;
};

export default UserPic;

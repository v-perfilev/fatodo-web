import * as React from 'react';
import {FC, PropsWithoutRef} from 'react';
import {userpicStyles} from './_styles';
import {User} from '../../models/user';
import {Avatar} from '@material-ui/core';
import csx from 'classnames';

type Props = PropsWithoutRef<any> & {
  user: User;
}

const Userpic: FC<Props> = ({user, className}: Props) => {
  const classes = userpicStyles();

  const url = user.avatarUrl ? user.avatarUrl : '.';
  const classNames = csx(classes.root, className);

  return (
    <Avatar alt={user.username} src={url} className={classNames} />
  );
};

export default Userpic;

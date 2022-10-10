import React, {HTMLAttributes} from 'react';
import {AuthState} from '../../store/rerducers/auth.reducer';
import csx from 'classnames';
import {UserView} from '../views';
import {convertAccountToUser} from '../../models/user.model';
import withAuthState from '../../shared/hocs/with-auth-state/with-auth-state';
import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

type ControlUserProps = AuthState & HTMLAttributes<HTMLElement>;

const ControlUser = ({account, className}: ControlUserProps) => {
  const classes = currentUserStyles();

  const user = convertAccountToUser(account);

  const classNames = csx(classes.root, className);
  return <UserView user={user} picSize="sm" withUsername className={classNames} />;
};

const currentUserStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: theme.spacing(1),
  },
}));

export default withAuthState(ControlUser);

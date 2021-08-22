import React, {FC, HTMLAttributes} from 'react';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import csx from 'classnames';
import {currentUserStyles} from './_styles';
import {UserView} from '../../views';
import {convertAccountToUser} from '../../../models/user.model';
import withAuthState from '../../../shared/hocs/with-auth-state';

type BaseProps = HTMLAttributes<HTMLElement>;

type Props = AuthState & BaseProps;

const CurrentUser: FC<Props> = ({account, className}: Props) => {
  const classes = currentUserStyles();
  const classNames = csx(classes.root, className);

  const user = convertAccountToUser(account);

  return <UserView user={user} picSize="sm" withUsername className={classNames} />;
};

export default withAuthState(CurrentUser);
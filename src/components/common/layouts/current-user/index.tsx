import React, {FC, HTMLAttributes} from 'react';
import {compose} from 'recompose';
import {RootState} from '../../../../store';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import csx from 'classnames';
import {currentUserStyles} from './_styles';
import {UserView} from '../../views/user-view';
import {convertAccountToUser} from '../../../../models/user.model';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & HTMLAttributes<HTMLElement>;

const CurrentUser: FC<Props> = ({authState, className}: Props) => {
  const classes = currentUserStyles();
  const classNames = csx(classes.root, className);

  const account = authState.account;
  const user = convertAccountToUser(account);

  return <UserView user={user} picSize="sm" withUsername className={classNames} />;
};

export default compose(connector)(CurrentUser);

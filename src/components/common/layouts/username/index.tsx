import React, {FC, HTMLAttributes} from 'react';
import {compose} from 'recompose';
import {RootState} from '../../../../store';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {RoundPic} from '../../images/round-pic';
import {Box} from '@material-ui/core';
import {User} from '../../../../models/user.model';
import csx from 'classnames';
import {usernameStyles} from './_styles';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector> &
  HTMLAttributes<HTMLElement> & {
    user: User;
  };

const Username: FC<Props> = ({authState, user, className}: Props) => {
  const classes = usernameStyles();
  const classNames = csx(classes.root, className);

  const account = user ?? authState.account;

  return (
    <Box className={classNames}>
      <RoundPic url={account.imageFilename} size="sm" border={1} className={classes.image} />
      {account.username}
    </Box>
  );
};

export default compose(connector)(Username);

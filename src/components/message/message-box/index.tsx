import React, {FC, memo} from 'react';
import {Message} from '../../../models/message.model';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {messageBoxStyles} from './_styles';
import MessageBoxOutcoming from './message-box-outcoming';
import MessageBoxIncoming from './message-box-incoming';
import {Box} from '@material-ui/core';
import {compose} from 'recompose';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  message: Message
}

const MessageBox: FC<Props> = ({authState, message}: Props) => {
  const classes = messageBoxStyles();

  const account = authState.account;
  const isMessageOutcoming = message.userId === account.id;

  return (
    <Box className={classes.root}>
      {isMessageOutcoming && <MessageBoxOutcoming message={message} />}
      {!isMessageOutcoming && <MessageBoxIncoming message={message} />}
    </Box>
  );
};

export default compose(memo)(MessageBox);

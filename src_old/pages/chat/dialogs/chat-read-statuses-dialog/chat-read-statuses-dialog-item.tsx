import React, {FC} from 'react';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {UserView} from '../../../../components/views';
import {chatReadStatusesDialogItemStyles} from './_styles';
import {MessageStatus} from '../../../../models/message.model';

type Props = {
  status: MessageStatus;
  user: User;
};

const ChatReadStatusesDialogItem: FC<Props> = ({user}: Props) => {
  const classes = chatReadStatusesDialogItemStyles();

  return (
    <Box className={classes.statusBox}>
      <Box className={classes.user}>
        <UserView user={user} withUsername withUserPic picSize="sm" />
      </Box>
    </Box>
  );
};

export default ChatReadStatusesDialogItem;

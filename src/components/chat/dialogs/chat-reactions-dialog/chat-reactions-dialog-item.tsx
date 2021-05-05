import React, {FC} from 'react';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ReactionView, UserWithPopupView} from '../../../common/views';
import {chatReactionsDialogItemStyles} from './_styles';
import {MessageReaction} from '../../../../models/message.model';

type Props = {
  reaction: MessageReaction;
  user: User;
};

const ChatReactionsDialogItem: FC<Props> = ({reaction, user}: Props) => {
  const classes = chatReactionsDialogItemStyles();

  return (
    <Box className={classes.statusBox}>
      <Box className={classes.reaction}>
        <ReactionView reactionType={reaction.type} color="primary" />
      </Box>
      <Box className={classes.user}>
        <UserWithPopupView user={user} withUsername withUserPic picSize="sm" />
      </Box>
    </Box>
  );
};

export default ChatReactionsDialogItem;
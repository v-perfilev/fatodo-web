import React, {FC} from 'react';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ReactionView, UserWithPopupView} from '../../../common/views';
import {chatReactionsDialogReactionStyles} from './_styles';
import {MessageReaction} from '../../../../models/message.model';

type Props = {
  reaction: MessageReaction;
  user: User;
};

const ChatReactionsDialogReaction: FC<Props> = ({reaction, user}: Props) => {
  const classes = chatReactionsDialogReactionStyles();

  return (
    <Box className={classes.reactionBox}>
      <Box className={classes.reaction}>
        <ReactionView reactionType={reaction.type} />
      </Box>
      <Box className={classes.user}>
        <UserWithPopupView user={user} withUsername withUserPic picSize="sm" />
      </Box>
    </Box>
  );
};

export default ChatReactionsDialogReaction;

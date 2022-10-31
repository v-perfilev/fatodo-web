import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';
import {MessageReaction} from '../../../../models/Message';
import ReactionView from '../../../../components/views/ReactionView';

type ChatMessageReactionsDialogItemProps = {
  reaction: MessageReaction;
  user: User;
};

const ChatMessageReactionsDialogItem = ({reaction, user}: ChatMessageReactionsDialogItemProps) => {
  return (
    <FHStack>
      <ReactionView reactionType={reaction.type} color="primary" />
      <UserView user={user} withUsername withUserPic />
    </FHStack>
  );
};

export default ChatMessageReactionsDialogItem;

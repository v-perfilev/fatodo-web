import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';
import ReactionView from '../../../../components/views/ReactionView';
import {CommentReaction} from '../../../../models/Comment';

type CommentReactionsDialogItemProps = {
  reaction: CommentReaction;
  user: User;
};

const CommentReactionsDialogItem = ({reaction, user}: CommentReactionsDialogItemProps) => {
  return (
    <FHStack alignItems="center">
      <ReactionView reactionType={reaction.type} color="primary" />
      <UserView user={user} withUsername withUserPic />
    </FHStack>
  );
};

export default CommentReactionsDialogItem;

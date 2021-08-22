import React, {FC} from 'react';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ReactionView, UserWithPopupView} from '../../../../components/views';
import {commentReactionsDialogItemStyles} from './_styles';
import {CommentReaction} from '../../../../models/comment.model';

type Props = {
  reaction: CommentReaction;
  user: User;
};

const CommentReactionsDialogItem: FC<Props> = ({reaction, user}: Props) => {
  const classes = commentReactionsDialogItemStyles();

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

export default CommentReactionsDialogItem;

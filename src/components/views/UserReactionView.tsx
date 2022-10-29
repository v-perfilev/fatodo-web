import React from 'react';
import {MessageReactionType} from '../../models/Message';
import {CommentReactionType} from '../../models/Comment';
import {User} from '../../models/User';
import UserView from './UserView';
import ReactionView from './ReactionView';
import {Box, SxProps} from '@mui/material';

type UserReactionViewProps = {
  user: User;
  reactionType: MessageReactionType & CommentReactionType;
};

const UserReactionView = ({user, reactionType}: UserReactionViewProps) => {
  return (
    <Box sx={containerStyles}>
      <UserView user={user} />
      <Box sx={reactionStyles}>
        <ReactionView reactionType={reactionType} color="primary" />
      </Box>
    </Box>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
};

const reactionStyles: SxProps = {
  position: 'absolute',
  right: -8,
  bottom: -8,
};

export default UserReactionView;

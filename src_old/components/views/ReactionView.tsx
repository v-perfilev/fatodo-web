import React, {ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {MessageReactionType} from '../../models/message.model';
import {CommentReactionType} from '../../models/comment.model';
import {IconProps} from '../surfaces/Icon';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';

type ReactionViewProps = IconProps & {
  statusType: MessageReactionType & CommentReactionType;
};

const ReactionView = ({statusType, className, ...props}: ReactionViewProps) => {
  const icon = (): ReactElement => {
    switch (statusType) {
      case 'LIKE':
        return <LikeIcon {...props} />;
      case 'DISLIKE':
        return <DislikeIcon {...props} />;
      default:
        return <LikeIcon {...props} />;
    }
  };

  return <Box className={className}>{icon}</Box>;
};

export default ReactionView;

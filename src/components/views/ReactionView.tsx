import React, {ReactElement} from 'react';
import FCenter from '../boxes/FCenter';
import {MessageReactionType} from '../../models/Message';
import {CommentReactionType} from '../../models/Comment';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';
import {IconProps} from '../surfaces/Icon';

type ReactionViewProps = IconProps & {
  reactionType: MessageReactionType & CommentReactionType;
};

const ReactionView = ({reactionType, ...props}: ReactionViewProps) => {
  const getIcon = (): ReactElement => {
    switch (reactionType) {
      case 'LIKE':
        return <LikeIcon />;
      case 'DISLIKE':
        return <DislikeIcon />;
      default:
        return <LikeIcon />;
    }
  };

  const icon = React.cloneElement(getIcon(), {...props});

  return <FCenter>{icon}</FCenter>;
};

export default ReactionView;

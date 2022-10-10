import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {MessageReactionType} from '../../../models/message.model';
import {LikeIcon} from '../../icons/LikeIcon';
import {DislikeIcon} from '../../icons/DislikeIcon';
import {IconProps} from '../../surfaces';
import {CommentReactionType} from '../../../models/comment.model';

type Props = IconProps & {
  statusType: MessageReactionType & CommentReactionType;
};

export const ReactionView: FC<Props> = ({statusType, className, ...props}: Props) => {
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

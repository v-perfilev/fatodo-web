import * as React from 'react';
import {FC, ReactElement, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {MessageReactionType} from '../../../../models/message.model';
import {LikeIcon} from '../../icons/like-icon';
import {DislikeIcon} from '../../icons/dislike-icon';
import {IconProps} from '../../surfaces';

type Props = IconProps & {
  reactionType: MessageReactionType;
};

export const ReactionView: FC<Props> = ({reactionType, className, ...props}: Props) => {
  const icon = useMemo<ReactElement>(() => {
    switch (reactionType) {
      case 'LIKE':
        return <LikeIcon {...props} />;
      case 'DISLIKE':
        return <DislikeIcon {...props} />;
      default:
        return <LikeIcon {...props} />;
    }
  }, [reactionType]);

  return <Box className={className}>{icon}</Box>;
};

import * as React from 'react';
import {FC, ReactElement, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {MessageReaction} from '../../../../models/message.model';
import {LikeIcon} from '../../icons/like-icon';
import {DislikeIcon} from '../../icons/dislike-icon';
import {IconProps} from '../../surfaces';

type Props = IconProps & {
  reaction: MessageReaction;
};

export const ReactionView: FC<Props> = ({reaction, className, ...props}: Props) => {

  const icon = useMemo<ReactElement>(() => {
    switch (reaction.type) {
      case 'LIKE':
        return <LikeIcon {...props} />;
      case 'DISLIKE':
        return <DislikeIcon {...props} />;
      default:
        return <LikeIcon {...props} />;
    }
  }, [reaction]);

  return <Box className={className}>{icon}</Box>;
};

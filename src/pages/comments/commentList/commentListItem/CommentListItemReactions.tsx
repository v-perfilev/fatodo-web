import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import FVStack from '../../../../components/boxes/FVStack';
import ReactionView from '../../../../components/views/ReactionView';
import FHStack from '../../../../components/boxes/FHStack';
import {Comment, CommentReactionType, commentReactionTypes} from '../../../../models/Comment';
import {MessageReactionType} from '../../../../models/Message';
import {SxProps, Typography} from '@mui/material';
import {CommentsActions} from '../../../../store/comments/commentsActions';

const buildReactionMap = (comment: Comment, isOwnComment: boolean): Map<CommentReactionType, number> => {
  const map = new Map();
  commentReactionTypes.forEach((reaction) => {
    const count = comment?.reactions.filter((r) => r.type === reaction).length;
    if (!isOwnComment || count > 0) {
      map.set(reaction, count);
    }
  });
  return map;
};

type CommentListItemReactionsProps = {
  comment: Comment;
  isOwnComment: boolean;
};

const CommentListItemReactions = ({comment, isOwnComment}: CommentListItemReactionsProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const [activeReaction, setActiveReaction] = useState<MessageReactionType>();
  const [reactionMap, setReactionMap] = useState<Map<MessageReactionType, number>>(
    buildReactionMap(comment, isOwnComment),
  );

  const updateReactionsMap = (): void => {
    const newReactionMap = buildReactionMap(comment, isOwnComment);
    setReactionMap(newReactionMap);
  };

  const updateActiveReaction = (): void => {
    const reaction = comment.reactions.find((r) => r.userId === account.id);
    setActiveReaction(reaction?.type);
  };

  const handleReaction = useCallback(
    (r: MessageReactionType) => (): void => {
      if (r === activeReaction) {
        dispatch(CommentsActions.noReactionThunk({comment, account}));
      } else if (r === 'LIKE') {
        dispatch(CommentsActions.likeReactionThunk({comment, account}));
      } else if (r === 'DISLIKE') {
        dispatch(CommentsActions.dislikeReactionThunk({comment, account}));
      }
    },
    [comment, activeReaction],
  );

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [comment.reactions]);

  const reaction = (r: MessageReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary' : 'disabled';
    const direction = !isOwnComment ? 'row-reverse' : 'row';
    const handleClick = !isOwnComment ? handleReaction(r) : undefined;

    return (
      <FHStack sx={reactionStyles(isOwnComment)} spacing={1} direction={direction} onClick={handleClick} key={key}>
        {count > 0 && (
          <Typography color="grey.500" fontSize={12}>
            {count}
          </Typography>
        )}
        <ReactionView reactionType={r} fontSize="small" color={color} />
      </FHStack>
    );
  };

  return (
    <FVStack sx={containerStyles} spacing={1}>
      {Array.from(reactionMap.keys()).map(reaction)}
    </FVStack>
  );
};

const containerStyles: SxProps = {
  height: '100%',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
};

const reactionStyles = (isOutcoming: boolean): SxProps => ({
  cursor: isOutcoming ? undefined : 'pointer',
  height: 20,
  flexGrow: 0,
  justifyContent: 'flex-end',
});

export default memo(CommentListItemReactions);

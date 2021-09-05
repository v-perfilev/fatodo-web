import React, {FC, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {Comment, CommentReactionType, commentReactionTypes} from '../../../models/comment.model';
import CommentService from '../../../services/comment.service';
import {User} from '../../../models/user.model';
import {commentItemReactionsStyles} from './_styles';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {CommentUtils} from '../../../shared/utils/comment.utils';
import {ReactionView} from '../../../components/views';

type Props = {
  comment: Comment;
  account: User;
};

const CommentItemReactions: FC<Props> = ({comment, account}: Props) => {
  const classes = commentItemReactionsStyles();
  const {handleResponse} = useSnackContext();
  const [reactionMap, setReactionMap] = useState<Map<CommentReactionType, number>>(new Map());
  const [activeReaction, setActiveReaction] = useState<CommentReactionType>();

  const setUsersReaction = useCallback(
    (r: CommentReactionType) => {
      setActiveReaction(r !== activeReaction ? r : undefined);
      setReactionMap((prevState) => {
        if (activeReaction) {
          prevState.set(activeReaction, prevState.get(activeReaction) - 1);
        }
        if (r) {
          prevState.set(r, prevState.get(r) + 1);
        }
        return new Map(prevState);
      });
    },
    [reactionMap]
  );

  const handleClick = useCallback(
    (r: CommentReactionType) => (): void => {
      setUsersReaction(r);
      if (r === activeReaction) {
        CommentService.noneCommentReaction(comment.id).catch(handleResponse);
      } else if (r === 'LIKE') {
        CommentService.likeCommentReaction(comment.id).catch(handleResponse);
      } else if (r === 'DISLIKE') {
        CommentService.dislikeCommentReaction(comment.id).catch(handleResponse);
      }
    },
    [comment, activeReaction]
  );

  const isOwnComment = useMemo((): boolean => {
    return CommentUtils.isOwnComment(comment, account);
  }, [comment, account]);

  const updateReactionsMap = useCallback(() => {
    const map = new Map();
    commentReactionTypes.forEach((reaction) => {
      const count = comment?.reactions.filter((r) => r.type === reaction).length;
      if (!isOwnComment || count > 0) {
        map.set(reaction, count);
      }
    });
    setReactionMap(map);
  }, [comment.reactions]);

  const updateActiveReaction = useCallback(() => {
    const reaction = comment.reactions.find((r) => r.userId === account?.id);
    setActiveReaction(reaction?.type);
  }, [comment.reactions]);

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [comment.reactions]);

  const reactionClassNames = csx(
    classes.reaction,
    {[classes.pointer]: !isOwnComment},
    {[classes.countOnRight]: !isOwnComment},
    {[classes.countOnLeft]: isOwnComment}
  );

  const reaction = (r: CommentReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary' : 'inherit';
    const onClick = !isOwnComment ? handleClick(r) : undefined;
    return (
      <Box className={reactionClassNames} onClick={onClick} key={key}>
        {count > 0 && <Box className={classes.count}>{count}</Box>}
        <ReactionView reactionType={r} fontSize="small" color={color} />
      </Box>
    );
  };

  return reactionMap.size > 0 && <Box className={classes.root}>{Array.from(reactionMap.keys()).map(reaction)}</Box>;
};

export default CommentItemReactions;

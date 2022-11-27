import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Message, MessageReactionType, messageReactionTypes} from '../../../../models/Message';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {ChatActions} from '../../../../store/chat/chatActions';
import ReactionView from '../../../../components/views/ReactionView';
import {Box, SxProps, Typography} from '@mui/material';

const buildReactionMap = (message: Message, isOutcoming: boolean): Map<MessageReactionType, number> => {
  const map = new Map();
  messageReactionTypes.forEach((reaction) => {
    const count = message?.reactions.filter((r) => r.type === reaction).length;
    if (!isOutcoming || count > 0) {
      map.set(reaction, count);
    }
  });
  return map;
};

type ChatViewMessageReactionsProps = {
  comment: Message;
  isOwnComment: boolean;
};

const ChatViewMessageReactions = ({comment, isOwnComment}: ChatViewMessageReactionsProps) => {
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
        dispatch(ChatActions.noReactionThunk(comment));
      } else if (r === 'LIKE') {
        dispatch(ChatActions.likeReactionThunk(comment));
      } else if (r === 'DISLIKE') {
        dispatch(ChatActions.dislikeReactionThunk(comment));
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
    <Box>
      <FVStack marginTop={1} spacing={1}>
        {Array.from(reactionMap.keys()).map(reaction)}
      </FVStack>
    </Box>
  );
};

const reactionStyles = (isOutcoming: boolean): SxProps => ({
  cursor: isOutcoming ? undefined : 'pointer',
  height: 20,
  flexGrow: 0,
  justifyContent: 'flex-end',
});

export default memo(ChatViewMessageReactions);

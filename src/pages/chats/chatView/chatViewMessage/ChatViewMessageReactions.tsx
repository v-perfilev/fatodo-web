import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Message, MessageReactionType, messageReactionTypes} from '../../../../models/Message';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {ChatActions} from '../../../../store/chat/chatActions';
import ReactionView from '../../../../components/views/ReactionView';
import {SxProps, Typography} from '@mui/material';

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
  message: Message;
  isOutcoming: boolean;
};

const ChatViewMessageReactions = ({message, isOutcoming}: ChatViewMessageReactionsProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const [activeReaction, setActiveReaction] = useState<MessageReactionType>();
  const [reactionMap, setReactionMap] = useState<Map<MessageReactionType, number>>(
    buildReactionMap(message, isOutcoming),
  );

  const updateReactionsMap = (): void => {
    const newReactionMap = buildReactionMap(message, isOutcoming);
    setReactionMap(newReactionMap);
  };

  const updateActiveReaction = (): void => {
    const reaction = message.reactions.find((r) => r.userId === account.id);
    setActiveReaction(reaction?.type);
  };

  const handleReaction = useCallback(
    (r: MessageReactionType) => (): void => {
      if (r === activeReaction) {
        dispatch(ChatActions.noReactionThunk(message));
      } else if (r === 'LIKE') {
        dispatch(ChatActions.likeReactionThunk(message));
      } else if (r === 'DISLIKE') {
        dispatch(ChatActions.dislikeReactionThunk(message));
      }
    },
    [message, activeReaction],
  );

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [message.reactions]);

  const reaction = (r: MessageReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary' : 'disabled';
    const direction = !isOutcoming ? 'row-reverse' : 'row';
    const handleClick = !isOutcoming ? handleReaction(r) : undefined;

    return (
      <FHStack sx={reactionStyles(isOutcoming)} spacing={1} direction={direction} onClick={handleClick} key={key}>
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

export default memo(ChatViewMessageReactions);

import React, {FC, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message, MessageReactionType, messageReactionTypes} from '../../../../models/message.model';
import {chatContentMessageReactionsStyles} from './_styles';
import {ReactionView} from '../../../common/views';
import ChatService from '../../../../services/chat.service';
import {User} from '../../../../models/user.model';
import csx from 'classnames';

type Props = {
  message: Message;
  account: User;
};

const ChatContentMessageReactions: FC<Props> = ({message, account}: Props) => {
  const classes = chatContentMessageReactionsStyles();
  const {handleResponse} = useSnackContext();
  const [reactionMap, setReactionMap] = useState<Map<MessageReactionType, number>>(new Map());
  const [activeReaction, setActiveReaction] = useState<MessageReactionType>();

  const handleClick = useCallback(
    (r: MessageReactionType) => (): void => {
      if (r === activeReaction) {
        ChatService.noneMessageReaction(message.id).catch(handleResponse);
      } else if (r === 'LIKE') {
        ChatService.likeMessageReaction(message.id).catch(handleResponse);
      } else if (r === 'DISLIKE') {
        ChatService.dislikeMessageReaction(message.id).catch(handleResponse);
      }
    },
    [message, activeReaction]
  );

  const isOutcoming = useMemo<boolean>(() => {
    return message.userId === account?.id;
  }, [message]);

  const updateReactionsMap = useCallback(() => {
    const map = new Map();
    messageReactionTypes.forEach((reaction) => {
      const count = message?.reactions.filter((r) => r.type === reaction).length;
      if (!isOutcoming || count > 0) {
        map.set(reaction, count);
      }
    });
    setReactionMap(map);
  }, [message.reactions]);

  const updateActiveReaction = useCallback(() => {
    const reaction = message.reactions.find((r) => r.userId === account?.id);
    setActiveReaction(reaction?.type);
  }, [message.reactions]);

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [message.reactions]);

  const reactionClassNames = csx(
    classes.reaction,
    {[classes.pointer]: !isOutcoming},
    {[classes.countOnRight]: !isOutcoming},
    {[classes.countOnLeft]: isOutcoming}
  );

  const reaction = (r: MessageReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary' : 'inherit';
    const onClick = !isOutcoming ? handleClick(r) : undefined;
    return (
      <Box className={reactionClassNames} onClick={onClick} key={key}>
        {count > 0 && <Box className={classes.count}>{count}</Box>}
        <ReactionView reactionType={r} fontSize="small" color={color} />
      </Box>
    );
  };

  return <Box className={classes.root}>{Array.from(reactionMap.keys()).map(reaction)}</Box>;
};

export default ChatContentMessageReactions;

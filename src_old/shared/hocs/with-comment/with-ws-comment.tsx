import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Comment, CommentReactions} from '../../../models/comment.model';
import {WsCommentContext} from '../../contexts/comment-contexts/ws-comment-context';
import {useWsContext} from '../../contexts/ws-contexts/ws-context';

enum WsCommentDestinations {
  COMMENT_NEW = '/user/comment/new/',
  COMMENT_UPDATE = '/user/comment/update/',
  COMMENT_REACTION = '/user/comment/reaction/',
}

type Props = PropsWithChildren<HTMLElement>;

const withWsComment = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();
  const [targetId, setTargetId] = useState<string>();
  const [commentNewEvent, setCommentNewEvent] = useState<Comment>(null);
  const [commentUpdateEvent, setCommentUpdateEvent] = useState<Comment>(null);
  const [commentReactionsEvent, setCommentReactionsEvent] = useState<CommentReactions>(null);

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsCommentDestinations.COMMENT_NEW)) {
      setCommentNewEvent(msg);
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_UPDATE)) {
      setCommentUpdateEvent(msg);
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_REACTION)) {
      setCommentReactionsEvent(msg);
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    const wsTopics = [] as string[];
    if (targetId) {
      wsTopics.push(
        WsCommentDestinations.COMMENT_NEW + targetId,
        WsCommentDestinations.COMMENT_UPDATE + targetId,
        WsCommentDestinations.COMMENT_REACTION + targetId,
      );
    }
    return wsTopics;
  }, [targetId]);

  useEffect(() => {
    setTopicsAndHandler('WS_COMMENT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_COMMENT');
  }, [targetId]);

  const context = {
    selectCommentTargetIdForWs: setTargetId,
    commentNewEvent,
    commentUpdateEvent,
    commentReactionsEvent,
  };

  return (
    <WsCommentContext.Provider value={context}>
      <Component {...props} />
    </WsCommentContext.Provider>
  );
};

export default withWsComment;

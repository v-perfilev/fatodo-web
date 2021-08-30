import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useState} from 'react';
import WsClient from '../../../components/ws/ws-client';
import {WS_URL} from '../../../constants';
import withAuthState from '../with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {flowRight} from 'lodash';
import {Comment, CommentReactions} from '../../../models/comment.model';
import {WsCommentContext} from '../../contexts/comment-contexts/ws-comment-context';

enum WsCommentDestinations {
  COMMENT_NEW = '/user/comment/new/',
  COMMENT_UPDATE = '/user/comment/update/',
  COMMENT_REACTION = '/user/comment/reaction/',
}

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = AuthState & BaseProps;

const withWsCommentClient = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const [targetId, setTargetId] = useState<string>();
  const [commentNewEvent, setCommentNewEvent] = useState<Comment>(null);
  const [commentUpdateEvent, setCommentUpdateEvent] = useState<Comment>(null);
  const [commentReactionsEvent, setCommentReactionsEvent] = useState<CommentReactions>(null);

  const onMessage = (msg: any, topic: string): void => {
    if (topic.startsWith(WsCommentDestinations.COMMENT_NEW)) {
      setCommentNewEvent(msg);
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_UPDATE)) {
      setCommentUpdateEvent(msg);
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_REACTION)) {
      setCommentReactionsEvent(msg);
    }
  };

  const wsMessageTopics = [] as string[];

  if (targetId) {
    wsMessageTopics.push(
      WsCommentDestinations.COMMENT_NEW + targetId,
      WsCommentDestinations.COMMENT_UPDATE + targetId,
      WsCommentDestinations.COMMENT_REACTION + targetId
    );
  }

  const context = {
    selectCommentTargetIdForWs: setTargetId,
    commentNewEvent,
    commentUpdateEvent,
    commentReactionsEvent,
  };

  return (
    <WsCommentContext.Provider value={context}>
      <Component {...props} />
      {isAuthenticated && <WsClient url={WS_URL} topics={wsMessageTopics} onMessage={onMessage} />}
    </WsCommentContext.Provider>
  );
};

export default flowRight([withAuthState, withWsCommentClient]);

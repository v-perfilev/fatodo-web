import React, {PropsWithChildren, useCallback} from 'react';
import {ChatInfo} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import InfoSelectors from '../../store/info/infoSelectors';
import Link from '../controls/Link';
import {ChatRouteUtils} from '../../routes/ChatRouter';

type ChatLinkProps = PropsWithChildren<{
  chat: ChatInfo;
  color?: string;
}>;

export const ChatLink = ({chat, color, children}: ChatLinkProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = chat.members.map((m) => m.userId);
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));

  const title = children || ChatUtils.getTitle(chat, users, account);
  const url = ChatRouteUtils.getChatUrl(chat.id);

  return (
    <Link to={url} color={color}>
      {title}
    </Link>
  );
};

export default ChatLink;

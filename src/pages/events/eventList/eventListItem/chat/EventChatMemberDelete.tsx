import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import UserListLinks from '../../../../../components/links/UserListLinks';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatMemberDelete = ({user, chat, users, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.memberDelete.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat}>{t('event:links.chat')}</ChatLink> : null);
  const Users = (): ReactElement => (users ? <UserListLinks users={users} /> : null);

  const image = <UserView user={user} />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.memberDelete.content"
      context={context}
      components={{user: <User />, chat: <Chat />, users: <Users />}}
    />
  );

  const loading = !user || !chat || !users.length;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventChat(EventChatMemberDelete);

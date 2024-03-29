import withEventChat, {WithEventChatProps} from '../../../../../shared/hocs/withEvents/withEventChat';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import ChatLink from '../../../../../components/links/ChatLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventChatUpdate = ({user, chat, date}: WithEventChatProps) => {
  const {t} = useTranslation();

  const title = t('event:chat.update.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Chat = (): ReactElement => (chat ? <ChatLink chat={chat} /> : null);

  const image = <UserView user={user} />;

  const context = user?.gender;
  const content = (
    <Trans i18nKey="event:chat.update.content" context={context} components={{user: <User />, chat: <Chat />}} />
  );

  const loading = !user || !chat;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventChat(EventChatUpdate);

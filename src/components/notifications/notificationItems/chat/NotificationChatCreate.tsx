import {Trans, useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import ChatLink from '../../../links/ChatLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import UserListLinks from '../../../links/UserListLinks';
import History from '../../../../shared/history';
import {ChatRouteUtils} from '../../../../routes/ChatRouter';

const NotificationChatCreate = ({user, chat, users}: WithEventChatProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToChat = (): void => History.push(ChatRouteUtils.getChatUrl(chat?.id));

  const title = t('event:chat.create.title');

  const image = <UserView user={user} size={20} />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:chat.create.content"
      context={context}
      components={{
        user: <UserLink user={user} />,
        chat: (
          <ChatLink chat={chat} noLink>
            {t('event:links.chat')}
          </ChatLink>
        ),
        users: <UserListLinks users={users} />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && chat && users.length > 0;
    ready && setReady(true);
  }, [user, chat, users]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToChat} />;
};

export default withEventChat(NotificationChatCreate);

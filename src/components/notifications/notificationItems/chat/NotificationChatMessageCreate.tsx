import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import UserView from '../../../views/UserView';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import History from '../../../../shared/history';
import {ChatRouteUtils} from '../../../../routes/ChatRouter';

const NotificationChatMessageCreate = ({user, chat, message}: WithEventChatProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToChat = (): void => History.push(ChatRouteUtils.getChatUrl(chat?.id));

  const title = t('event:chat.messageCreate.title');

  const author = user?.username;

  const image = <UserView user={user} size={30} />;

  const content = <>{message?.text}</>;

  useEffect(() => {
    const ready = user && chat && message;
    ready && setReady(true);
  }, [user, chat, message]);

  return <NotificationTemplate image={image} title={title} author={author} content={content} onClick={goToChat} />;
};

export default withEventChat(NotificationChatMessageCreate);

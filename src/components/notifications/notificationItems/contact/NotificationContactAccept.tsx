import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventContact, {WithEventContactProps} from '../../../../shared/hocs/withEvents/withEventContact';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';

const NotificationContactAccept = ({firstUser, secondUser}: WithEventContactProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const title = t('event:contact.accept.title');

  const image = <UserView user={firstUser} size={20} />;

  const context = firstUser?.gender;
  const content = (
    <Trans
      i18nKey="event:contact.accept.content"
      context={context}
      components={{firstUser: <UserLink user={firstUser} />, secondUser: <UserLink user={secondUser} />}}
    />
  );

  useEffect(() => {
    const ready = firstUser && secondUser;
    ready && setReady(true);
  }, [firstUser, secondUser]);

  return <NotificationTemplate image={image} title={title} content={content} />;
};

export default withEventContact(NotificationContactAccept);

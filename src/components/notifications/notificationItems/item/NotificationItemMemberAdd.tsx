import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventItem, {WithEventItemProps} from '../../../../shared/hocs/withEvents/withEventItem';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import GroupLink from '../../../links/GroupLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import UserListLinks from '../../../links/UserListLinks';
import History from '../../../../shared/history';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';

const NotificationItemMemberAdd = ({user, group, users}: WithEventItemProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToGroupView = (): void => History.push(GroupRouteUtils.getViewUrl(group?.id));

  const title = t('event:item.memberAdd.title');

  const image = <UserView user={user} size={20} />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.memberAdd.content"
      context={context}
      components={{
        user: <UserLink user={user} />,
        group: <GroupLink group={group} noLink />,
        users: <UserListLinks users={users} />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && group && users.length > 0;
    ready && setReady(true);
  }, [user, group, users]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToGroupView} />;
};

export default withEventItem(NotificationItemMemberAdd);

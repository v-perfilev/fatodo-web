import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventReminder, {WithEventReminderProps} from '../../../../shared/hocs/withEvents/withEventReminder';
import IconPic from '../../../surfaces/IconPic';
import AlarmIcon from '../../../icons/AlarmIcon';
import GroupLink from '../../../links/GroupLink';
import ItemLink from '../../../links/ItemLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import History from '../../../../shared/history';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';

const NotificationReminder = ({group, item}: WithEventReminderProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToItem = (): void => History.push(ItemRouteUtils.getViewUrl(item?.id));

  const title = t('event:reminder.title');

  const image = <IconPic icon={<AlarmIcon />} size={20} />;

  const content = (
    <Trans
      i18nKey="event:reminder.content"
      components={{group: <GroupLink group={group} noLink />, item: <ItemLink item={item} noLink />}}
    />
  );

  useEffect(() => {
    const ready = group && item;
    ready && setReady(true);
  }, [group, item]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToItem} />;
};

export default withEventReminder(NotificationReminder);

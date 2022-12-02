import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import withEventComment, {WithEventCommentProps} from '../../../../shared/hocs/withEvents/withEventComment';
import UserView from '../../../views/UserView';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import History from '../../../../shared/history';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';

const NotificationCommentAdd = ({user, group, item, comment}: WithEventCommentProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToComments = (): void => {
    group?.id && History.push(GroupRouteUtils.getViewUrl(group.id));
    item?.id && History.push(ItemRouteUtils.getViewUrl(item.id));
  };

  const image = <UserView user={user} size={20} />;

  const title = t('event:comment.add.title');

  const author = user?.username;

  const content = <>{comment?.text}</>;

  useEffect(() => {
    const ready = user && (group || item) && comment;
    ready && setReady(true);
  }, [user, group, item, comment]);

  return <NotificationTemplate image={image} title={title} author={author} content={content} onClick={goToComments} />;
};

export default withEventComment(NotificationCommentAdd);

import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventComment, {WithEventCommentProps} from '../../../../shared/hocs/withEvents/withEventComment';
import UserReactionView from '../../../views/UserReactionView';
import UserLink from '../../../links/UserLink';
import ItemLink from '../../../links/ItemLink';
import GroupLink from '../../../links/GroupLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import History from '../../../../shared/history';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';

const NotificationCommentReaction = ({user, group, item, reaction}: WithEventCommentProps) => {
  const {setReady} = useNotificationContext();
  const {t} = useTranslation();

  const goToComments = (): void => {
    group?.id && History.push(GroupRouteUtils.getViewUrl(group.id));
    item?.id && History.push(ItemRouteUtils.getViewUrl(item.id));
  };

  const title = t('event:comment.reaction.title');

  const image = <UserReactionView user={user} size={20} reactionType={reaction} />;

  const context = user?.gender;

  let content = null;

  if (item) {
    content = (
      <Trans
        i18nKey="event:comment.reaction.contentWithItem"
        context={context}
        components={{user: <UserLink user={user} />, item: <ItemLink item={item} noLink />}}
      />
    );
  } else if (group) {
    content = (
      <Trans
        i18nKey="event:comment.reaction.contentWithGroup"
        context={context}
        components={{user: <UserLink user={user} />, group: <GroupLink group={group} noLink />}}
      />
    );
  }

  useEffect(() => {
    const ready = user && (group || item);
    ready && setReady(true);
  }, [user, group, item]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToComments} />;
};

export default withEventComment(NotificationCommentReaction);

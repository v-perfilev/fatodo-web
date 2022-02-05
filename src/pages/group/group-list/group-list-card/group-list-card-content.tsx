import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {AccordionDetails} from '@material-ui/core';
import {useLoadingState} from '../../../../shared/hooks/use-loading-state';
import GroupListCardItem from './group-list-card-item';
import GroupListSkeletons from '../group-list-skeletons/group-list-skeletons';
import {groupListCardContentStyles} from './_styles';
import GroupListCardInfo from './group-list-card-info';
import GroupListCardCreateLink from './group-list-card-create-link';

type Props = {
  items: Item[];
  count: number;
};

const GroupListCardContent: FC<Props> = ({items, count}: Props) => {
  const classes = groupListCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = useGroupListItemsContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const loading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(loading);
  }, [group, previewLoading]);

  return (
    <AccordionDetails className={classes.content}>
      {loading && <GroupListSkeletons />}
      {!loading && !count && <GroupListCardCreateLink />}
      {!loading && count && items.map((item) => <GroupListCardItem item={item} key={item.id} />)}
      {!loading && count && <GroupListCardInfo items={items} count={count} />}
    </AccordionDetails>
  );
};

export default memo(GroupListCardContent);

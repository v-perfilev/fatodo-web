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
    const newLoading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(newLoading);
  }, [group, previewLoading]);

  return (
    <AccordionDetails className={classes.content}>
      {loading && <GroupListSkeletons />}
      {!loading && items.map((item) => <GroupListCardItem item={item} key={item.id} />)}
    </AccordionDetails>
  );
};

export default memo(GroupListCardContent);

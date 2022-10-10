import * as React from 'react';
import {FC, useEffect} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {AccordionDetails, Box} from '@material-ui/core';
import {useLoadingState} from '../../../../shared/hooks/use-loading-state';
import GroupListCardItem from './group-list-card-item';
import GroupListSkeletonItems from '../group-list-skeleton/group-list-skeleton-items';
import {groupListCardContentStyles} from './_styles';
import GroupListCardInfo from './group-list-card-info';

type Props = {
  items: Item[];
  count: number;
};

const GroupListCardContent: FC<Props> = ({items, count}: Props) => {
  const classes = groupListCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: listLoading} = useGroupListItemsContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const loading = group && listLoading.has(group.id) ? listLoading.get(group.id) : false;
    setLoading(loading);
  }, [group, listLoading]);

  return (
    <AccordionDetails className={classes.content}>
      {loading && <GroupListSkeletonItems />}
      {!loading && count > 0 && (
        <Box className={classes.items}>
          {items.map((item) => (
            <GroupListCardItem item={item} key={item.id} />
          ))}
        </Box>
      )}
      {!loading && <GroupListCardInfo items={items} count={count} />}
    </AccordionDetails>
  );
};

export default GroupListCardContent;
